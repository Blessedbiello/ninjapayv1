import React, { createContext, useContext, useState, useEffect } from 'react';
import { Keypair } from '@solana/web3.js';
import { connection, getBalance, requestAirdrop } from '../lib/solana';

interface WalletContextType {
  wallet: Keypair | null;
  publicKey: string | null;
  balance: number;
  isLoading: boolean;
  error: string | null;
  createWallet: () => void;
  refreshBalance: () => Promise<void>;
  requestAirdrop: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<Keypair | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createWallet = () => {
    try {
      const newWallet = Keypair.generate();
      setWallet(newWallet);
      setError(null);
    } catch (err) {
      setError('Failed to create wallet');
      console.error('Error creating wallet:', err);
    }
  };

  const refreshBalance = async () => {
    if (!wallet) return;
    
    setIsLoading(true);
    try {
      const newBalance = await getBalance(wallet.publicKey.toString());
      setBalance(newBalance);
      setError(null);
    } catch (err) {
      setError('Failed to fetch balance');
      console.error('Error refreshing balance:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAirdrop = async () => {
    if (!wallet) return;
    
    setIsLoading(true);
    try {
      await requestAirdrop(wallet.publicKey.toString());
      await refreshBalance();
      setError(null);
    } catch (err) {
      setError('Failed to request airdrop');
      console.error('Error requesting airdrop:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (wallet) {
      refreshBalance();
    }
  }, [wallet]);

  return (
    <WalletContext.Provider
      value={{
        wallet,
        publicKey: wallet?.publicKey.toString() || null,
        balance,
        isLoading,
        error,
        createWallet,
        refreshBalance,
        requestAirdrop: handleAirdrop,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};