import React, { useEffect } from 'react';
import { Shield, Lock, Eye, Wallet } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../assets/logo';
import { Card } from '../components/base/Card';
import { Button } from '../components/base/Button';

export const Login: React.FC = () => {
  const { isAuthenticated, signIn, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/portfolio');
    }
  }, [isAuthenticated, navigate]);

  const handleSignIn = async () => {
    try {
      await signIn();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: 'Privacy First',
      description: 'Enhanced transaction privacy with stealth addresses and zero-knowledge proofs',
    },
    {
      icon: <Lock className="w-8 h-8 text-primary" />,
      title: 'Secure by Design',
      description: 'High-grade encryption and secure key management',
    },
    {
      icon: <Eye className="w-8 h-8 text-primary" />,
      title: 'Transaction Privacy',
      description: 'Shield your balances and keep your financial activity confidential',
    },
    {
      icon: <Wallet className="w-8 h-8 text-primary" />,
      title: 'Multi-Asset Support',
      description: 'Manage assets with complete privacy',
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Hero content */}
          <div className="text-center lg:text-left">
            <Logo className="mx-auto lg:mx-0 mb-6" />
            <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-4">
              Your Privacy-First<br />Crypto payment platform
            </h1>
            <p className="text-text-secondary text-lg mb-8 max-w-lg mx-auto lg:mx-0">
              Take control of your financial privacy with NinjaPay. 
              Shield your transactions, protect your balances, and manage your 
              crypto assets with military-grade privacy features.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-card p-4 rounded-lg border border-element hover:border-primary/30 transition-colors"
                >
                  <div className="mb-3">{feature.icon}</div>
                  <h3 className="font-medium text-text-primary mb-2">{feature.title}</h3>
                  <p className="text-sm text-text-secondary">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Phone frame with auth card */}
          <div className="relative mx-auto w-[320px] h-[640px]">
            {/* Phone frame */}
            <div className="absolute inset-0 bg-card rounded-[3rem] shadow-xl border-8 border-element overflow-hidden">
              {/* Status bar */}
              <div className="bg-background h-6 flex items-center justify-between px-6">
                <span className="text-xs text-text-secondary">9:41</span>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 rounded-full bg-primary/20"></div>
                  <div className="w-4 h-4 rounded-full bg-primary/20"></div>
                  <div className="w-4 h-4 rounded-full bg-primary/20"></div>
                </div>
              </div>
              
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-element rounded-b-3xl"></div>
              
              {/* App content */}
              <div className="h-full pt-8 px-4 pb-4 flex flex-col">
                <div className="flex-1 flex flex-col items-center justify-center">
                  <Logo className="mb-6" />
                  <Card className="w-full p-6" gradient>
                    <div className="text-center mb-6">
                      <h2 className="text-xl font-bold text-text-primary mb-2">
                        Welcome to NinjaPay
                      </h2>
                      <p className="text-sm text-text-secondary">
                        Secure login powered by Civic Auth
                      </p>
                    </div>

                    <Button
                      fullWidth
                      size="lg"
                      onClick={handleSignIn}
                      isLoading={isLoading}
                      leftIcon={<Shield size={20} />}
                    >
                      Continue with Civic
                    </Button>

                    <p className="text-xs text-text-secondary text-center mt-4">
                      By continuing, you agree to our{' '}
                      <a href="#" className="text-primary hover:underline">Terms</a>
                      {' '}and{' '}
                      <a href="#" className="text-primary hover:underline">Privacy</a>
                    </p>
                  </Card>
                </div>
                
                {/* Home indicator */}
                <div className="w-32 h-1 bg-element rounded-full mx-auto mt-4"></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 border-t border-element">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-secondary text-sm">
            © 2025 NinjaPay. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-text-secondary hover:text-text-primary text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-text-secondary hover:text-text-primary text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-text-secondary hover:text-text-primary text-sm">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};