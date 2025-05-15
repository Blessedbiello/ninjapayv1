import React, { createContext, useContext, useState, useEffect } from 'react';
import { CivicAuthProvider, useUser, useSignIn, useSignOut } from '@civic/auth/react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  const { signIn } = useSignIn();
  const { signOut } = useSignOut();

  useEffect(() => {
    setIsLoading(false);
  }, [user]);

  const value = {
    isAuthenticated: !!user,
    user,
    signIn: async () => {
      try {
        await signIn();
      } catch (error) {
        console.error('Sign in error:', error);
        throw error;
      }
    },
    signOut: async () => {
      try {
        await signOut();
      } catch (error) {
        console.error('Sign out error:', error);
        throw error;
      }
    },
    isLoading,
  };

  return (
    <CivicAuthProvider>
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    </CivicAuthProvider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};