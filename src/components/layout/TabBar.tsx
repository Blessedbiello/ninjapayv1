import React from 'react';
import { 
  LayoutDashboard, 
  Send, 
  Shield, 
  Clock, 
  Settings 
} from 'lucide-react';

interface TabBarProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

export const TabBar: React.FC<TabBarProps> = ({
  activePage,
  onPageChange,
}) => {
  const tabs = [
    { id: 'portfolio', label: 'Portfolio', icon: <LayoutDashboard size={20} /> },
    { id: 'send-receive', label: 'Send', icon: <Send size={20} /> },
    { id: 'privacy', label: 'Privacy', icon: <Shield size={20} /> },
    { id: 'transactions', label: 'History', icon: <Clock size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-element lg:hidden">
      <div className="flex justify-between">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onPageChange(tab.id)}
            className={`
              flex flex-1 flex-col items-center py-3 text-xs font-medium
              ${activePage === tab.id 
                ? 'text-primary' 
                : 'text-text-secondary'}
            `}
          >
            {tab.icon}
            <span className="mt-1">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};