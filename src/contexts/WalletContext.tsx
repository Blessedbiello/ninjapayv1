import React, { createContext, useContext, useState, useEffect } from 'react';
import { Keypair, PublicKey } from '@solana/web3.js';
import { connection, getBalance } from '../lib/solana';

interface WalletContextType {
  wallet: Keypair | null;
  publicKey: string | null;
  balance: number;
  createWallet: () => void;
  refreshBalance: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<Keypair | null>(null);
  const [balance, setBalance] = useState<number>(0);

  const createWallet = () => {
    const newWallet = Keypair.generate();
    setWallet(newWallet);
  };

  const refreshBalance = async () => {
    if (wallet) {
      try {
        const newBalance = await getBalance(wallet.publicKey.toString());
        setBalance(newBalance);
      } catch (error) {
        console.error('Error refreshing balance:', error);
      }
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
        createWallet,
        refreshBalance,
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