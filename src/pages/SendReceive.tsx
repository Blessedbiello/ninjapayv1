import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight, QrCode, Copy, Shield, Info, LogIn } from 'lucide-react';
import { Card } from '../components/base/Card';
import { Button } from '../components/base/Button';
import { TextField } from '../components/base/TextField';
import { SegmentedControl } from '../components/base/SegmentedControl';
import { Badge } from '../components/base/Badge';
import { Toggle } from '../components/base/Toggle';
import { usePrivacy } from '../contexts/PrivacyContext';
import { useWallet } from '../contexts/WalletContext';
import { useAuth } from '../contexts/AuthContext';
import { sendTransaction } from '../lib/solana';

export const SendReceive: React.FC = () => {
  const { privacyLevel, setPrivacyLevel } = usePrivacy();
  const { wallet, publicKey, balance, isLoading, error, requestAirdrop, createWallet } = useWallet();
  const { isAuthenticated, signIn } = useAuth();
  
  const [activeTab, setActiveTab] = useState('send');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [useStealthAddress, setUseStealthAddress] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  if (!isAuthenticated) {
    return (
      <Card className="p-6">
        <div className="text-center py-8">
          <h2 className="text-lg font-medium text-text-primary mb-4">Authentication Required</h2>
          <p className="text-text-secondary mb-6">Please sign in to access wallet features</p>
          <Button
            leftIcon={<LogIn size={18} />}
            onClick={() => signIn()}
            size="lg"
          >
            Sign In
          </Button>
        </div>
      </Card>
    );
  }

  const tabOptions = [
    { value: 'send', label: 'Send' },
    { value: 'receive', label: 'Receive' },
  ];

  const privacyLevelOptions = [
    { value: 'standard', label: 'Standard' },
    { value: 'enhanced', label: 'Enhanced' },
    { value: 'maximum', label: 'Maximum' },
  ];

  const handleSend = async () => {
    if (!wallet || !recipientAddress || !amount) {
      setSendError('Please fill in all fields');
      return;
    }

    setIsSending(true);
    setSendError(null);

    try {
      const signature = await sendTransaction(
        wallet,
        recipientAddress,
        parseFloat(amount),
        privacyLevel !== 'standard'
      );
      console.log('Transaction sent:', signature);
      setRecipientAddress('');
      setAmount('');
    } catch (err) {
      setSendError('Failed to send transaction');
      console.error('Error sending transaction:', err);
    } finally {
      setIsSending(false);
    }
  };

  const handleCopyAddress = async () => {
    if (publicKey) {
      await navigator.clipboard.writeText(publicKey);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <SegmentedControl
        options={tabOptions}
        value={activeTab}
        onChange={setActiveTab}
      />
      
      {activeTab === 'send' ? (
        <Card className="p-6">
          <h2 className="text-lg font-medium text-text-primary mb-4">Send Payment</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded-lg">
              <p className="text-sm text-error">{error}</p>
            </div>
          )}
          
          <div className="space-y-4">
            <TextField
              label="Recipient Address"
              placeholder="Enter Solana address"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              fullWidth
              rightIcon={<QrCode size={18} />}
              error={sendError}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <TextField
                label="Amount"
                placeholder="0.00"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
              />
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Asset
                </label>
                <select className="bg-element text-text-primary rounded-lg border border-element hover:border-secondary focus:border-primary block w-full p-2.5 outline-none transition-colors">
                  <option value="SOL">SOL</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Privacy Level
              </label>
              <SegmentedControl
                options={privacyLevelOptions}
                value={privacyLevel}
                onChange={(value) => setPrivacyLevel(value as any)}
              />
              
              <div className="mt-2 p-3 bg-element rounded-lg">
                <div className="flex items-start gap-2">
                  <Info size={16} className="text-text-secondary mt-0.5" />
                  <div>
                    <p className="text-sm text-text-primary">
                      {privacyLevel === 'standard' && 'Standard privacy uses regular Solana transactions. Your transaction will be visible on the blockchain.'}
                      {privacyLevel === 'enhanced' && 'Enhanced privacy obscures transaction amounts and some metadata. Provides better privacy than standard.'}
                      {privacyLevel === 'maximum' && 'Maximum privacy uses full stealth transactions with zero-knowledge proofs. Highest level of privacy.'}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-text-secondary">Fee:</span>
                      <Badge variant="primary" size="sm">
                        {privacyLevel === 'standard' && '0.000005 SOL'}
                        {privacyLevel === 'enhanced' && '0.00005 SOL'}
                        {privacyLevel === 'maximum' && '0.0005 SOL'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Button 
              fullWidth 
              leftIcon={<Shield size={18} />}
              size="lg"
              onClick={handleSend}
              isLoading={isSending}
              disabled={!wallet || isSending || !recipientAddress || !amount}
            >
              Send Privately
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-text-primary">Receive Payment</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-secondary">Stealth Address</span>
              <Toggle
                checked={useStealthAddress}
                onChange={setUseStealthAddress}
              />
            </div>
          </div>
          
          {!wallet ? (
            <div className="text-center py-8">
              <p className="text-text-secondary mb-4">Create a wallet to receive payments</p>
              <div className="space-y-3">
                <Button 
                  fullWidth 
                  onClick={createWallet}
                  leftIcon={<Shield size={18} />}
                >
                  Create New Wallet
                </Button>
                <Button 
                  fullWidth 
                  variant="secondary"
                  onClick={() => requestAirdrop()}
                  isLoading={isLoading}
                  disabled={!wallet}
                >
                  Request Devnet SOL
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center mb-6">
                {useStealthAddress && (
                  <Badge variant="primary" className="mb-4">
                    Stealth Address Active
                  </Badge>
                )}
                
                <div className="bg-element p-8 rounded-xl mb-6 w-full max-w-[280px] aspect-square flex items-center justify-center">
                  <QrCode size={200} className="text-text-primary" />
                </div>
                
                <div className="w-full space-y-2">
                  <p className="text-sm text-text-secondary text-center">Your wallet address</p>
                  <div className="flex items-center gap-2 bg-element p-3 rounded-lg w-full">
                    <p className="text-sm text-text-primary truncate flex-1 font-mono">
                      {publicKey}
                    </p>
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      leftIcon={<Copy size={14} />}
                      onClick={handleCopyAddress}
                    >
                      {copySuccess ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-element rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info size={18} className="text-text-secondary mt-0.5" />
                  <div>
                    <p className="text-sm text-text-primary mb-1">
                      {useStealthAddress 
                        ? 'Using a stealth address enhances your privacy by generating a unique address for each transaction.'
                        : 'Enable stealth address to improve your privacy by using unique addresses for each transaction.'}
                    </p>
                    <p className="text-xs text-text-secondary">
                      Current balance: {balance.toFixed(4)} SOL
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </Card>
      )}
    </div>
  );
};