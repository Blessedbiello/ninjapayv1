import React from 'react';
import { ArrowUpRight, ArrowDownRight, Shield, Eye, EyeOff } from 'lucide-react';
import { Card } from '../components/base/Card';
import { Button } from '../components/base/Button';
import { Badge } from '../components/base/Badge';
import { ProgressBar } from '../components/base/ProgressBar';

export const Portfolio: React.FC = () => {
  const [hideBalances, setHideBalances] = React.useState(false);
  
  const assets = [
    { 
      name: 'Solana', 
      ticker: 'SOL', 
      balance: 12.45, 
      balanceUsd: 1245.67, 
      change: 2.34,
      logo: '🟣'
    },
    { 
      name: 'USD Coin', 
      ticker: 'USDC', 
      balance: 500.00, 
      balanceUsd: 500.00, 
      change: 0.01,
      logo: '🔵'
    },
    { 
      name: 'Bonk', 
      ticker: 'BONK', 
      balance: 1500000, 
      balanceUsd: 150.75, 
      change: -5.67,
      logo: '🟠'
    },
  ];

  const totalBalance = assets.reduce((sum, asset) => sum + asset.balanceUsd, 0);
  const shieldedPercentage = 35;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-text-primary">Total Balance</h2>
          <button 
            onClick={() => setHideBalances(!hideBalances)}
            className="p-1.5 rounded-full text-text-secondary hover:bg-element"
          >
            {hideBalances ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        </div>
        
        <div className="mb-6">
          <div className="flex items-baseline gap-2">
            <h1 className="text-3xl font-bold text-text-primary">
              {hideBalances ? '••••••' : `$${totalBalance.toFixed(2)}`}
            </h1>
            <Badge variant="success" className="flex items-center gap-1">
              <ArrowUpRight size={12} />
              <span>2.4%</span>
            </Badge>
          </div>
          <p className="text-sm text-text-secondary mt-1">24h change</p>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-text-secondary">Shielded Funds</span>
            <span className="text-sm font-medium text-text-primary">{shieldedPercentage}%</span>
          </div>
          <ProgressBar value={shieldedPercentage} gradient />
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          <Button leftIcon={<ArrowUpRight size={16} />}>Send</Button>
          <Button leftIcon={<ArrowDownRight size={16} />} variant="secondary">Receive</Button>
          <Button leftIcon={<Shield size={16} />} variant="secondary">Shield</Button>
        </div>
      </Card>
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-text-primary">Assets</h2>
          <Button variant="text" size="sm">View all</Button>
        </div>
        
        <div className="space-y-3">
          {assets.map((asset) => (
            <Card key={asset.ticker} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-element flex items-center justify-center text-xl">
                    {asset.logo}
                  </div>
                  <div>
                    <h3 className="font-medium text-text-primary">{asset.name}</h3>
                    <p className="text-sm text-text-secondary">{asset.ticker}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-medium text-text-primary">
                    {hideBalances ? '••••••' : `${asset.balance.toLocaleString()} ${asset.ticker}`}
                  </p>
                  <div className="flex items-center justify-end gap-2">
                    <p className="text-sm text-text-secondary">
                      {hideBalances ? '••••••' : `$${asset.balanceUsd.toFixed(2)}`}
                    </p>
                    <Badge 
                      variant={asset.change >= 0 ? 'success' : 'error'} 
                      size="sm"
                      className="flex items-center gap-0.5"
                    >
                      {asset.change >= 0 ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                      <span>{Math.abs(asset.change)}%</span>
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};