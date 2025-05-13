import React from 'react';
import { Card } from '../components/base/Card';
import { Toggle } from '../components/base/Toggle';
import { SegmentedControl } from '../components/base/SegmentedControl';
import { TextField } from '../components/base/TextField';
import { Button } from '../components/base/Button';
import { usePrivacy } from '../contexts/PrivacyContext';

export const Settings: React.FC = () => {
  const { privacySettings, updatePrivacySetting } = usePrivacy();
  const [network, setNetwork] = React.useState('mainnet');
  const [currency, setCurrency] = React.useState('usd');
  
  const networkOptions = [
    { value: 'mainnet', label: 'Mainnet' },
    { value: 'devnet', label: 'Devnet' },
    { value: 'testnet', label: 'Testnet' },
  ];
  
  const currencyOptions = [
    { value: 'usd', label: 'USD' },
    { value: 'eur', label: 'EUR' },
    { value: 'gbp', label: 'GBP' },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-lg font-medium text-text-primary mb-4">Profile</h2>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-xl font-medium">
            U
          </div>
          <div>
            <h3 className="font-medium text-text-primary">User</h3>
            <p className="text-sm text-text-secondary">user@example.com</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <TextField
            label="Display Name"
            placeholder="Enter your name"
            defaultValue="User"
            fullWidth
          />
          
          <Button>Update Profile</Button>
        </div>
      </Card>
      
      <Card className="p-6">
        <h2 className="text-lg font-medium text-text-primary mb-4">Network & Currency</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Network
            </label>
            <SegmentedControl
              options={networkOptions}
              value={network}
              onChange={setNetwork}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Currency
            </label>
            <SegmentedControl
              options={currencyOptions}
              value={currency}
              onChange={setCurrency}
            />
          </div>
        </div>
      </Card>
      
      <Card className="p-6">
        <h2 className="text-lg font-medium text-text-primary mb-4">Privacy Preferences</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-primary">Default Privacy Level</p>
              <p className="text-xs text-text-secondary mt-0.5">
                Set enhanced privacy as default for all transactions
              </p>
            </div>
            <Toggle
              checked={privacySettings.defaultTransactionPrivacy}
              onChange={(checked) => updatePrivacySetting('defaultTransactionPrivacy', checked)}
            />
          </div>
          
          <div>
            <p className="text-text-primary mb-2">Auto-shield Threshold</p>
            <TextField
              placeholder="1000"
              type="number"
              helperText="Amounts above this value will be automatically shielded"
              fullWidth
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-primary">Use Stealth Addresses</p>
              <p className="text-xs text-text-secondary mt-0.5">
                Generate one-time addresses for receiving funds
              </p>
            </div>
            <Toggle
              checked={privacySettings.stealthAddressByDefault}
              onChange={(checked) => updatePrivacySetting('stealthAddressByDefault', checked)}
            />
          </div>
        </div>
      </Card>
      
      <Card className="p-6">
        <h2 className="text-lg font-medium text-text-primary mb-4">Security</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-primary">Biometric Authentication</p>
              <p className="text-xs text-text-secondary mt-0.5">
                Use fingerprint or face ID to unlock the wallet
              </p>
            </div>
            <Toggle checked={false} onChange={() => {}} />
          </div>
          
          <div>
            <p className="text-text-primary mb-2">Auto-lock Timeout</p>
            <select className="bg-element text-text-primary rounded-lg border border-element hover:border-secondary focus:border-primary block w-full p-2.5 outline-none transition-colors">
              <option value="1">After 1 minute</option>
              <option value="5">After 5 minutes</option>
              <option value="15">After 15 minutes</option>
              <option value="30">After 30 minutes</option>
              <option value="60">After 1 hour</option>
            </select>
          </div>
          
          <Button variant="secondary">Manage Saved Devices</Button>
        </div>
      </Card>
      
      <Card className="p-6">
        <h2 className="text-lg font-medium text-text-primary mb-4">Appearance</h2>
        
        <div className="space-y-4">
          <div>
            <p className="text-text-primary mb-2">Theme</p>
            <select className="bg-element text-text-primary rounded-lg border border-element hover:border-secondary focus:border-primary block w-full p-2.5 outline-none transition-colors">
              <option value="system">System Default</option>
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-primary">Compact Mode</p>
              <p className="text-xs text-text-secondary mt-0.5">
                Use a more compact UI layout
              </p>
            </div>
            <Toggle checked={false} onChange={() => {}} />
          </div>
        </div>
      </Card>
      
      <Card className="p-6">
        <h2 className="text-lg font-medium text-text-primary mb-4">About</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between">
            <p className="text-text-primary">Version</p>
            <p className="text-text-secondary">1.0.0</p>
          </div>
          
          <div className="flex justify-between">
            <p className="text-text-primary">Build</p>
            <p className="text-text-secondary">2025.01.01</p>
          </div>
          
          <div className="flex flex-col gap-2">
            <Button variant="secondary">Privacy Policy</Button>
            <Button variant="secondary">Terms of Service</Button>
            <Button variant="secondary">Documentation</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};