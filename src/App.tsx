import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { TabBar } from './components/layout/TabBar';
import { Portfolio } from './pages/Portfolio';
import { SendReceive } from './pages/SendReceive';
import { PrivacyControls } from './pages/PrivacyControls';
import { Transactions } from './pages/Transactions';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';
import { AppProvider, useApp } from './contexts/AppContext';
import { PrivacyProvider } from './contexts/PrivacyContext';
import { WalletProvider } from './contexts/WalletContext';
import { CivicAuthProvider, useAuth } from './contexts/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const { activePage, setActivePage, isSidebarOpen, toggleSidebar } = useApp();
  const { isAuthenticated } = useAuth();

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

  if (!isAuthenticated) {
    return <Login />;
  }

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
    <Router>
      <CivicAuthProvider>
        <AppProvider>
          <PrivacyProvider>
            <WalletProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route 
                  path="/*" 
                  element={
                    <ProtectedRoute>
                      <AppContent />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </WalletProvider>
          </PrivacyProvider>
        </AppProvider>
      </CivicAuthProvider>
    </Router>
  );
}

export default App;