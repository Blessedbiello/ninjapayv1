import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, QrCode, Copy, Shield, Info } from 'lucide-react';
import { Card } from '../components/base/Card';
import { Button } from '../components/base/Button';
import { TextField } from '../components/base/TextField';
import { SegmentedControl } from '../components/base/SegmentedControl';
import { Badge } from '../components/base/Badge';
import { Toggle } from '../components/base/Toggle';
import { usePrivacy } from '../contexts/PrivacyContext';
import { useWallet } from '../contexts/WalletContext';
import { sendTransaction } from '../lib/solana';

export const SendReceive: React.FC = () => {
  const { privacyLevel, setPrivacyLevel } = usePrivacy();
  const { wallet, publicKey, balance, isLoading, error, requestAirdrop } = useWallet();
  
  const [activeTab, setActiveTab] = useState('send');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [useStealthAddress, setUseStealthAddress] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-text-primary">Receive Payment</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-secondary">Stealth Address</span>
              <Toggle
                checked={useStealthAddress}
                onChange={setUseStealthAddress}
              />
            </div>
          </div>
          
          <div className="flex flex-col items-center mb-6">
            {!wallet ? (
              <Button onClick={() => requestAirdrop()} isLoading={isLoading}>
                Request Devnet SOL
              </Button>
            ) : (
              <>
                {useStealthAddress && (
                  <Badge variant="primary" className="mb-2">
                    Stealth Address Active
                  </Badge>
                )}
                
                <div className="bg-white p-4 rounded-lg mb-4">
                  <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                    <QrCode size={120} className="text-background" />
                  </div>
                </div>
                
                <div className="flex items-center gap-2 bg-element p-2 rounded-lg w-full">
                  <p className="text-sm text-text-primary truncate flex-1 px-2">
                    {publicKey}
                  </p>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    leftIcon={<Copy size={14} />}
                    onClick={() => navigator.clipboard.writeText(publicKey || '')}
                  >
                    Copy
                  </Button>
                </div>
              </>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};