import React from 'react';
import { Info, Shield } from 'lucide-react';
import { Card } from '../components/base/Card';
import { Toggle } from '../components/base/Toggle';
import { SegmentedControl } from '../components/base/SegmentedControl';
import { ProgressBar } from '../components/base/ProgressBar';
import { Button } from '../components/base/Button';
import { usePrivacy } from '../contexts/PrivacyContext';

export const PrivacyControls: React.FC = () => {
  const { 
    privacyLevel, 
    setPrivacyLevel,
    privacySettings,
    updatePrivacySetting,
    privacyScores
  } = usePrivacy();

  const privacyLevelOptions = [
    { value: 'standard', label: 'Standard' },
    { value: 'enhanced', label: 'Enhanced' },
    { value: 'maximum', label: 'Maximum' },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6 flex flex-col items-center">
        <h2 className="text-lg font-medium text-text-primary mb-4">Privacy Score</h2>
        
        <div className="relative w-48 h-48 mb-6">
          <div className="w-full h-full rounded-full bg-element flex items-center justify-center">
            <div className="text-center">
              <span className="text-5xl font-bold text-primary">{privacyScores.overall}</span>
              <p className="text-sm text-text-secondary mt-1">out of 100</p>
            </div>
          </div>
          <svg className="absolute top-0 left-0 w-full h-full -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke="#201f26"
              strokeWidth="16"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke="url(#privacyGradient)"
              strokeWidth="16"
              strokeDasharray={2 * Math.PI * 88}
              strokeDashoffset={2 * Math.PI * 88 * (1 - privacyScores.overall / 100)}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="privacyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4b0082" />
                <stop offset="100%" stopColor="#9370db" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        <div className="w-full">
          <SegmentedControl
            options={privacyLevelOptions}
            value={privacyLevel}
            onChange={(value) => setPrivacyLevel(value as any)}
            className="mb-4"
          />
          
          <Button fullWidth>Optimize Privacy</Button>
        </div>
      </Card>
      
      <Card className="p-6">
        <h2 className="text-lg font-medium text-text-primary mb-4">Privacy Settings</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1">
                <span className="text-text-primary">Default Transaction Privacy</span>
                <button className="text-text-secondary">
                  <Info size={14} />
                </button>
              </div>
              <p className="text-xs text-text-secondary mt-0.5">
                Automatically use enhanced privacy for all transactions
              </p>
            </div>
            <Toggle
              checked={privacySettings.defaultTransactionPrivacy}
              onChange={(checked) => updatePrivacySetting('defaultTransactionPrivacy', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1">
                <span className="text-text-primary">Stealth Address by Default</span>
                <button className="text-text-secondary">
                  <Info size={14} />
                </button>
              </div>
              <p className="text-xs text-text-secondary mt-0.5">
                Use one-time stealth addresses for receiving funds
              </p>
            </div>
            <Toggle
              checked={privacySettings.stealthAddressByDefault}
              onChange={(checked) => updatePrivacySetting('stealthAddressByDefault', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1">
                <span className="text-text-primary">Auto-shield Large Amounts</span>
                <button className="text-text-secondary">
                  <Info size={14} />
                </button>
              </div>
              <p className="text-xs text-text-secondary mt-0.5">
                Automatically shield amounts over $1,000
              </p>
            </div>
            <Toggle
              checked={privacySettings.autoShieldLargeAmounts}
              onChange={(checked) => updatePrivacySetting('autoShieldLargeAmounts', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1">
                <span className="text-text-primary">Transaction Metadata Protection</span>
                <button className="text-text-secondary">
                  <Info size={14} />
                </button>
              </div>
              <p className="text-xs text-text-secondary mt-0.5">
                Obscure transaction metadata to prevent analysis
              </p>
            </div>
            <Toggle
              checked={privacySettings.transactionMetadataProtection}
              onChange={(checked) => updatePrivacySetting('transactionMetadataProtection', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1">
                <span className="text-text-primary">Obfuscate Connected Apps</span>
                <button className="text-text-secondary">
                  <Info size={14} />
                </button>
              </div>
              <p className="text-xs text-text-secondary mt-0.5">
                Hide wallet connections from blockchain analysis
              </p>
            </div>
            <Toggle
              checked={privacySettings.obfuscateConnectedApps}
              onChange={(checked) => updatePrivacySetting('obfuscateConnectedApps', checked)}
            />
          </div>
        </div>
      </Card>
      
      <Card className="p-6">
        <h2 className="text-lg font-medium text-text-primary mb-4">Privacy Score Breakdown</h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-text-primary">Shielded Balance</span>
              <span className="text-sm font-medium text-text-primary">{privacyScores.shieldedBalance}%</span>
            </div>
            <ProgressBar value={privacyScores.shieldedBalance} />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-text-primary">Transaction Privacy</span>
              <span className="text-sm font-medium text-text-primary">{privacyScores.transactionPrivacy}%</span>
            </div>
            <ProgressBar value={privacyScores.transactionPrivacy} />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-text-primary">Address Isolation</span>
              <span className="text-sm font-medium text-text-primary">{privacyScores.addressIsolation}%</span>
            </div>
            <ProgressBar value={privacyScores.addressIsolation} />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-text-primary">Metadata Protection</span>
              <span className="text-sm font-medium text-text-primary">{privacyScores.metadataProtection}%</span>
            </div>
            <ProgressBar value={privacyScores.metadataProtection} />
          </div>
        </div>
      </Card>
      
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="text-primary" size={24} />
          <h2 className="text-lg font-medium text-text-primary">Privacy Suggestions</h2>
        </div>
        
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary mt-0.5">
              1
            </div>
            <div>
              <p className="text-text-primary">Shield more of your balance</p>
              <p className="text-sm text-text-secondary mt-0.5">
                Currently only 35% of your funds are shielded. We recommend shielding at least 70%.
              </p>
            </div>
          </li>
          
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary mt-0.5">
              2
            </div>
            <div>
              <p className="text-text-primary">Enable stealth addresses</p>
              <p className="text-sm text-text-secondary mt-0.5">
                Using stealth addresses prevents address reuse and improves privacy.
              </p>
            </div>
          </li>
          
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary mt-0.5">
              3
            </div>
            <div>
              <p className="text-text-primary">Use enhanced privacy for transactions</p>
              <p className="text-sm text-text-secondary mt-0.5">
                Your last 5 transactions were standard. Switch to enhanced privacy.
              </p>
            </div>
          </li>
        </ul>
      </Card>
    </div>
  );
};