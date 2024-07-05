'use client';

import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

export interface AuthContextState {
  isLoggedIn: boolean;
  isLoggingIn: boolean;
  user: unknown;
}

export const AuthContext = createContext<AuthContextState>({
  isLoggedIn: false,
  isLoggingIn: false,
  user: null,
});
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [user, setUser] = useState<{} | null>(null);
  const isLoggedIn = !!user;

  const checkCurrentAuth = useCallback(async () => {
    if (isLoggedIn || isLoggingIn) return;

    setIsLoggingIn(true);

    try {
      const authResult = await fetch('/.auth/me', { next: { revalidate: 300 } });

      if (authResult.ok) {
        setUser(authResult.json());
      } else {
        console.error('Failed to fetch meeee:', authResult.json());
        setUser(null);
      }
    } catch (err) {
      console.error('Bigger error:', err);
    }
  }, [isLoggedIn, isLoggingIn]);

  useEffect(() => {
    checkCurrentAuth();
  }, [checkCurrentAuth]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoggingIn, user }}>
      {children}
    </AuthContext.Provider>
  );
};
