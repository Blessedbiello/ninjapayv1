import React, { createContext, useContext } from 'react';
import { CivicAuthProvider as CivicProvider, useUser } from '@civic/auth/react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, signIn, signOut, isLoading } = useUser();

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
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const CivicAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <CivicProvider clientId="c2e7b692-5e6d-4050-88ec-fa7ee44c4fbf">
      <AuthProvider>{children}</AuthProvider>
    </CivicProvider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};