// useAuth.js
import { useEffect, useState } from 'react';
import { supabase } from '../db/Superbase-client';

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  const signIn = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const isAdmin = () => {
    const whitelist = import.meta.env.VITE_ADMIN_WHITELIST?.split(',') || [];
    return user && whitelist.includes(user.email);
  };

  return { user, signIn, signOut, isAdmin };
};
