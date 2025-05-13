import React from 'react';
import { Menu, Bell } from 'lucide-react';
import { Logo } from '../../assets/logo';
import { PrivacyScoreBadge } from './PrivacyScoreBadge';

interface HeaderProps {
  toggleSidebar: () => void;
  privacyScore?: number;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar, privacyScore = 75 }) => {
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
        <PrivacyScoreBadge score={privacyScore} />
        
        <button className="p-2 rounded-lg text-text-secondary hover:bg-element relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
        </button>
        
        <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-element">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-medium">
            U
          </div>
        </button>
      </div>
    </header>
  );
};