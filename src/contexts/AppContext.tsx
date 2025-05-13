import React, { createContext, useContext, useState, useEffect } from 'react';

interface AppContextType {
  activePage: string;
  setActivePage: (page: string) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState('portfolio');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  // Close sidebar when changing page on mobile
  useEffect(() => {
    closeSidebar();
  }, [activePage]);

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        isSidebarOpen,
        toggleSidebar,
        closeSidebar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};