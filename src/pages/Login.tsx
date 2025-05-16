import React from 'react';
import { Shield, Lock, Eye, Wallet } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../assets/logo';
import { Card } from '../components/base/Card';
import { Button } from '../components/base/Button';

export const Login: React.FC = () => {
  const { isAuthenticated, signIn, isLoading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/portfolio');
    }
  }, [isAuthenticated, navigate]);

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: 'Privacy First',
      description: 'Enhanced transaction privacy with stealth addresses and zero-knowledge proofs',
    },
    {
      icon: <Lock className="w-8 h-8 text-primary" />,
      title: 'Secure by Design',
      description: 'Military-grade encryption and secure key management',
    },
    {
      icon: <Eye className="w-8 h-8 text-primary" />,
      title: 'Transaction Privacy',
      description: 'Shield your balances and keep your financial activity private',
    },
    {
      icon: <Wallet className="w-8 h-8 text-primary" />,
      title: 'Multi-Asset Support',
      description: 'Manage multiple cryptocurrencies with complete privacy',
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
              Your Privacy-First<br />Crypto Wallet
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

          {/* Right side - Auth card */}
          <Card className="w-full max-w-md mx-auto p-8" gradient>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-2">
                Welcome to NinjaPay
              </h2>
              <p className="text-text-secondary">
                Secure login powered by Civic Auth
              </p>
            </div>

            <div className="space-y-6">
              <Button
                fullWidth
                size="lg"
                onClick={() => signIn()}
                isLoading={isLoading}
                leftIcon={<Shield size={20} />}
              >
                Continue with Civic
              </Button>

              <div className="text-center">
                <p className="text-sm text-text-secondary">
                  By continuing, you agree to our{' '}
                  <a href="#" className="text-primary hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                </p>
              </div>
            </div>
          </Card>
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