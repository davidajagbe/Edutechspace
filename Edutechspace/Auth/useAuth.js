import { useEffect, useState, useRef } from 'react';
import { supabase } from '../db/Superbase-client';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const refreshTimeout = useRef(null);

  const clearUrlTokens = () => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("access_token")) {
      window.history.replaceState({}, document.title, url.pathname);
    }
  };

  const scheduleRefresh = (expiresInSeconds) => {
    const refreshTime = Math.max((expiresInSeconds - 60) * 1000, 1000); // refresh 1 min before
    clearTimeout(refreshTimeout.current);

    refreshTimeout.current = setTimeout(() => {
      refreshSession();
    }, refreshTime);
  };

  const refreshSession = async (retry = 0) => {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      if (error) {
        if (error.status === 429 && retry < 5) {
          const delay = Math.pow(2, retry) * 1000;
          console.warn(`⚠️ Rate limited. Retrying in ${delay / 1000}s...`);
          return setTimeout(() => refreshSession(retry + 1), delay);
        }
        throw error;
      }

      setUser(data.session?.user ?? null);
      scheduleRefresh(data.session.expires_in);
    } catch (err) {
      console.error("🚨 Refresh session failed:", err);
    }
  };

  const initializeSession = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;

      const session = data.session;
      if (session) {
        setUser(session.user);
        scheduleRefresh(session.expires_in);
      } else {
        setUser(null);
      }

      clearUrlTokens();
    } catch (err) {
      console.error("🔑 Session init error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initializeSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session) scheduleRefresh(session.expires_in);
    });

    return () => {
      clearTimeout(refreshTimeout.current);
      listener?.subscription?.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + window.location.pathname
      }
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const isAdmin = () => {
    if (!user) return false;
    const whitelist = import.meta.env.VITE_ADMIN_WHITELIST?.split(',') || [];
    return whitelist.includes(user.email);
  };

  return {
    user,
    loading,
    signInWithGoogle,
    signOut,
    isAdmin
  };
};
