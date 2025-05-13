import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { TabBar } from './components/layout/TabBar';
import { Portfolio } from './pages/Portfolio';
import { SendReceive } from './pages/SendReceive';
import { PrivacyControls } from './pages/PrivacyControls';
import { Transactions } from './pages/Transactions';
import { Settings } from './pages/Settings';
import { AppProvider, useApp } from './contexts/AppContext';
import { PrivacyProvider } from './contexts/PrivacyContext';

const AppContent: React.FC = () => {
  const { activePage, setActivePage, isSidebarOpen, toggleSidebar } = useApp();

  const renderPage = () => {
    switch (activePage) {
      case 'portfolio':
        return <Portfolio />;
      case 'send-receive':
        return <SendReceive />;
      case 'privacy':
        return <PrivacyControls />;
      case 'transactions':
        return <Transactions />;
      case 'settings':
        return <Settings />;
      default:
        return <Portfolio />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Header toggleSidebar={toggleSidebar} />
      
      <div className="flex">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => toggleSidebar()} 
          activePage={activePage}
          onPageChange={setActivePage}
        />
        
        <main className="flex-1 p-4 pb-20 lg:pb-4 max-w-4xl mx-auto">
          {renderPage()}
        </main>
      </div>
      
      <TabBar 
        activePage={activePage}
        onPageChange={setActivePage}
      />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <PrivacyProvider>
        <AppContent />
      </PrivacyProvider>
    </AppProvider>
  );
}

export default App;