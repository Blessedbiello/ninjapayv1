import React from 'react';
import { Menu, Bell, LogIn, LogOut } from 'lucide-react';
import { Logo } from '../../assets/logo';
import { PrivacyScoreBadge } from './PrivacyScoreBadge';
import { Button } from '../base/Button';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  toggleSidebar: () => void;
  privacyScore?: number;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar, privacyScore = 75 }) => {
  const { isAuthenticated, user, signIn, signOut, isLoading } = useAuth();

  return (
    <header className="bg-card border-b border-element h-16 px-4 flex items-center justify-between">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-lg text-text-secondary hover:bg-element mr-2 lg:hidden"
        >
          <Menu size={20} />
        </button>
        <Logo />
      </div>
      
      <div className="flex items-center gap-4">
        {isAuthenticated && <PrivacyScoreBadge score={privacyScore} />}
        
        {isAuthenticated ? (
          <>
            <button className="p-2 rounded-lg text-text-secondary hover:bg-element relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
            </button>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-medium">
                {user?.name?.[0] || 'U'}
              </div>
              <Button 
                variant="text" 
                size="sm" 
                leftIcon={<LogOut size={16} />}
                onClick={() => signOut()}
              >
                Sign Out
              </Button>
            </div>
          </>
        ) : (
          <Button
            leftIcon={<LogIn size={16} />}
            onClick={() => signIn()}
            isLoading={isLoading}
          >
            Sign In
          </Button>
        )}
      </div>
    </header>
  );
};