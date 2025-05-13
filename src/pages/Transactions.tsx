import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Shield, Search, Filter, ExternalLink } from 'lucide-react';
import { Card } from '../components/base/Card';
import { SegmentedControl } from '../components/base/SegmentedControl';
import { Badge } from '../components/base/Badge';
import { TextField } from '../components/base/TextField';
import { Button } from '../components/base/Button';

export const Transactions: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'private', label: 'Private' },
    { value: 'public', label: 'Public' },
  ];

  const transactions = [
    {
      id: 'tx1',
      type: 'send',
      isPrivate: true,
      recipient: 'Private Transaction',
      date: 'Today, 14:32',
      amount: -1.25,
      asset: 'SOL',
      amountUsd: 125.67,
    },
    {
      id: 'tx2',
      type: 'receive',
      isPrivate: false,
      recipient: 'HN7cABqLq46Es1j...',
      date: 'Today, 10:15',
      amount: 500,
      asset: 'USDC',
      amountUsd: 500,
    },
    {
      id: 'tx3',
      type: 'shield',
      isPrivate: true,
      recipient: 'Shield Transaction',
      date: 'Yesterday, 18:45',
      amount: -2.5,
      asset: 'SOL',
      amountUsd: 250.34,
    },
    {
      id: 'tx4',
      type: 'receive',
      isPrivate: true,
      recipient: 'Private Transaction',
      date: 'Yesterday, 12:20',
      amount: 0.75,
      asset: 'SOL',
      amountUsd: 75.21,
    },
    {
      id: 'tx5',
      type: 'send',
      isPrivate: false,
      recipient: 'HN7cABqLq46Es1j...',
      date: '2 days ago, 09:30',
      amount: -100,
      asset: 'USDC',
      amountUsd: 100,
    },
  ];

  const filteredTransactions = activeFilter === 'all' 
    ? transactions 
    : transactions.filter(tx => 
        activeFilter === 'private' ? tx.isPrivate : !tx.isPrivate
      );

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'send':
        return <ArrowUpRight size={16} className="text-error" />;
      case 'receive':
        return <ArrowDownRight size={16} className="text-success" />;
      case 'shield':
        return <Shield size={16} className="text-primary" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <SegmentedControl
          options={filterOptions}
          value={activeFilter}
          onChange={setActiveFilter}
          className="w-full sm:w-auto"
        />
        
        <div className="flex gap-2 w-full sm:w-auto">
          <TextField
            placeholder="Search transactions"
            leftIcon={<Search size={16} />}
            className="flex-1"
          />
          <Button variant="secondary" leftIcon={<Filter size={16} />}>
            Filter
          </Button>
        </div>
      </div>
      
      <div className="space-y-3">
        {filteredTransactions.map((tx) => (
          <Card key={tx.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-element flex items-center justify-center">
                  {getTransactionIcon(tx.type)}
                </div>
                
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-text-primary">
                      {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                    </h3>
                    {tx.isPrivate && (
                      <Badge variant="primary" size="sm">Private</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <p className="text-xs text-text-secondary">{tx.recipient}</p>
                    {!tx.isPrivate && (
                      <ExternalLink size={12} className="text-text-secondary" />
                    )}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <p className={`font-medium ${tx.amount >= 0 ? 'text-success' : 'text-error'}`}>
                  {tx.amount >= 0 ? '+' : ''}{tx.amount} {tx.asset}
                </p>
                <p className="text-xs text-text-secondary">
                  {tx.date}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {filteredTransactions.length === 0 && (
        <div className="text-center py-8">
          <p className="text-text-secondary">No transactions found</p>
        </div>
      )}
    </div>
  );
};