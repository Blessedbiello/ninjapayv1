import React from 'react';
import { 
  LayoutDashboard, 
  Send, 
  Shield, 
  Clock, 
  Settings, 
  X 
} from 'lucide-react';
import { Logo } from '../../assets/logo';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activePage: string;
  onPageChange: (page: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  activePage,
  onPageChange,
}) => {
  const menuItems = [
    { id: 'portfolio', label: 'Portfolio', icon: <LayoutDashboard size={20} /> },
    { id: 'send-receive', label: 'Send/Receive', icon: <Send size={20} /> },
    { id: 'privacy', label: 'Privacy Controls', icon: <Shield size={20} /> },
    { id: 'transactions', label: 'Transactions', icon: <Clock size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-card border-r border-element transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 lg:static lg:z-0
        `}
      >
        <div className="p-4 flex items-center justify-between border-b border-element">
          <Logo />
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-text-secondary hover:bg-element lg:hidden"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onPageChange(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
                    ${activePage === item.id 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-text-secondary hover:bg-element hover:text-text-primary'}
                  `}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};