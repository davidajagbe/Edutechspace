import { useEffect, useState, useRef } from 'react';
import { supabase } from '../db/Superbase-client';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const refreshTimeout = useRef(null);
  const refreshAttempts = useRef(0);
  const MAX_RETRIES = 5;

  const clearUrlTokens = () => {
    try {
      const url = new URL(window.location.href);
      if (url.hash || url.searchParams.get("access_token")) {
        window.history.replaceState({}, document.title, url.pathname);
      }
    } catch (err) {
      console.warn("Failed to clear URL tokens", err);
    }
  };

  const scheduleRefresh = (expiresInSeconds) => {
    // Don't schedule refreshes for very short or negative expiry times
    if (!expiresInSeconds || expiresInSeconds < 60) {
      console.warn("Invalid expiry time for token refresh:", expiresInSeconds);
      return;
    }
    
    // Calculate when to refresh (75% of expiry time or 1 hour, whichever is less)
    const refreshTime = Math.min(
      expiresInSeconds * 750, // 75% of expiry time in ms
      3600 * 1000 // 1 hour in ms (maximum refresh interval)
    );
    
    clearTimeout(refreshTimeout.current);
    
    console.log(`Scheduling session refresh in ${refreshTime/1000}s`);
    refreshTimeout.current = setTimeout(() => {
      refreshSession();
    }, refreshTime);
  };

  const refreshSession = async () => {
    try {
      // Check if we've had too many failures
      if (refreshAttempts.current >= MAX_RETRIES) {
        console.warn("Max refresh retries reached, forcing logout");
        await supabase.auth.signOut();
        setUser(null);
        refreshAttempts.current = 0;
        return;
      }

      console.log("Refreshing authentication session...");
      const { data, error } = await supabase.auth.refreshSession();
      
      if (error) {
        refreshAttempts.current++;
        
        // Handle rate limiting with exponential backoff
        if (error.status === 429) {
          const delay = Math.min(
            Math.pow(2, refreshAttempts.current) * 1000, 
            60000 // Max 1 minute wait
          );
          console.warn(`Rate limited. Retrying in ${delay/1000}s...`);
          setTimeout(() => refreshSession(), delay);
          return;
        }
        
        throw error;
      }
      
      // Reset attempts counter on success
      refreshAttempts.current = 0;
      
      if (data.session) {
        setUser(data.session.user);
        // Schedule next refresh
        scheduleRefresh(data.session.expires_in);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Session refresh failed:", err);
      
      // If refresh fails completely, try again in 30 seconds
      setTimeout(() => refreshSession(), 30000);
    }
  };

  const initializeSession = async () => {
    try {
      // First try to get session from Supabase
      const { data, error } = await supabase.auth.getSession();
      
      if (error) throw error;
      
      if (data.session) {
        setUser(data.session.user);
        scheduleRefresh(data.session.expires_in);
      } else {
        setUser(null);
      }
      
      // Clean up URL if there's an OAuth redirect
      clearUrlTokens();
    } catch (err) {
      console.error("Session initialization error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initializeSession();

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state change:", event);
      
      if (session) {
        setUser(session.user);
        scheduleRefresh(session.expires_in);
      } else {
        setUser(null);
      }
    });

    return () => {
      // Clean up on unmount
      clearTimeout(refreshTimeout.current);
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + window.location.pathname
        }
      });
      
      if (error) throw error;
    } catch (err) {
      console.error("Google sign-in error:", err);
      throw err;
    }
  };

  const signOut = async () => {
    try {
      clearTimeout(refreshTimeout.current);
      await supabase.auth.signOut();
      setUser(null);
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  const isAdmin = () => {
    if (!user) return false;
    
    try {
      const whitelist = import.meta.env.VITE_ADMIN_WHITELIST?.split(',') || [];
      return whitelist.includes(user.email);
    } catch (err) {
      console.error("Admin check error:", err);
      return false;
    }
  };

  return {
    user,
    loading,
    signInWithGoogle,
    signOut,
    isAdmin
  };
};