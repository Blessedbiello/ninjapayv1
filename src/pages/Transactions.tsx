import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight, Shield, Search, Filter, ExternalLink } from 'lucide-react';
import { Card } from '../components/base/Card';
import { SegmentedControl } from '../components/base/SegmentedControl';
import { Badge } from '../components/base/Badge';
import { TextField } from '../components/base/TextField';
import { Button } from '../components/base/Button';
import { useWallet } from '../contexts/WalletContext';
import { getTransactionHistory } from '../lib/solana';

interface Transaction {
  id: string;
  type: string;
  is_private: boolean;
  to_address: string;
  from_address: string;
  amount: number;
  token: string;
  signature: string;
  created_at: string;
}

export const Transactions: React.FC = () => {
  const { publicKey } = useWallet();
  const [activeFilter, setActiveFilter] = useState('all');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'private', label: 'Private' },
    { value: 'public', label: 'Public' },
  ];

  useEffect(() => {
    const loadTransactions = async () => {
      if (!publicKey) return;
      
      setIsLoading(true);
      try {
        const history = await getTransactionHistory(publicKey);
        setTransactions(history);
        setError(null);
      } catch (err) {
        setError('Failed to load transactions');
        console.error('Error loading transactions:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadTransactions();
  }, [publicKey]);

  const filteredTransactions = activeFilter === 'all' 
    ? transactions 
    : transactions.filter(tx => 
        activeFilter === 'private' ? tx.is_private : !tx.is_private
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center text-error">
          <p>{error}</p>
          <Button 
            variant="secondary" 
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      </Card>
    );
  }

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
                    {tx.is_private && (
                      <Badge variant="primary" size="sm">Private</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <p className="text-xs text-text-secondary">
                      {tx.type === 'send' ? tx.to_address : tx.from_address}
                    </p>
                    {!tx.is_private && (
                      <a 
                        href={`https://explorer.solana.com/tx/${tx.signature}?cluster=devnet`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-secondary hover:text-primary"
                      >
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <p className={`font-medium ${tx.type === 'receive' ? 'text-success' : 'text-error'}`}>
                  {tx.type === 'receive' ? '+' : '-'}{tx.amount} {tx.token}
                </p>
                <p className="text-xs text-text-secondary">
                  {new Date(tx.created_at).toLocaleString()}
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