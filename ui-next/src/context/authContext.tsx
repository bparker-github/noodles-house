'use client';

import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

export interface AuthContextState {
  user: unknown;
  setUser: unknown;
}

export const AuthContext = createContext<AuthContextState | null>(null);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<{} | null>(null);

  useEffect(() => {
    fetch('/.auth/me', { next: { revalidate: 300 } })
      .then((authResult) => {
        if (authResult.ok) {
          setUser(authResult.json());
        } else {
          console.error('Failed to fetch meeee:', authResult.json());
          setUser(null);
        }
      })
      .catch((err) => {
        console.error('Bigger error:', err);
      });
  }, []);

  return <AuthContext.Provider value={{ setUser, user }}>{children}</AuthContext.Provider>;
};
