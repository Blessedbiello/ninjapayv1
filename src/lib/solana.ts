import { 
  Connection, 
  PublicKey, 
  Transaction, 
  SystemProgram, 
  LAMPORTS_PER_SOL,
  clusterApiUrl,
  Keypair,
  sendAndConfirmTransaction
} from '@solana/web3.js';
import { supabase } from './supabase';

// Initialize connection to devnet
export const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

export const DEVNET_ENDPOINT = clusterApiUrl('devnet');

export async function getBalance(address: string): Promise<number> {
  try {
    const publicKey = new PublicKey(address);
    const balance = await connection.getBalance(publicKey);
    return balance / LAMPORTS_PER_SOL;
  } catch (error) {
    console.error('Error getting balance:', error);
    throw error;
  }
}

export async function requestAirdrop(address: string): Promise<string> {
  try {
    const publicKey = new PublicKey(address);
    const signature = await connection.requestAirdrop(
      publicKey,
      LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(signature);
    
    // Record airdrop in transaction history
    await supabase.from('transactions').insert({
      type: 'airdrop',
      amount: 1,
      token: 'SOL',
      to_address: address,
      signature,
      is_private: false
    });
    
    return signature;
  } catch (error) {
    console.error('Error requesting airdrop:', error);
    throw error;
  }
}

export async function sendTransaction(
  fromWallet: Keypair,
  toAddress: string,
  amount: number,
  isPrivate: boolean = false
): Promise<string> {
  try {
    const toPublicKey = new PublicKey(toAddress);
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: fromWallet.publicKey,
        toPubkey: toPublicKey,
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );

    const signature = await sendAndConfirmTransaction(
      connection,
      transaction,
      [fromWallet]
    );

    // Record transaction in database
    await supabase.from('transactions').insert({
      type: 'send',
      amount: amount,
      token: 'SOL',
      from_address: fromWallet.publicKey.toString(),
      to_address: toAddress,
      signature,
      is_private: isPrivate
    });

    return signature;
  } catch (error) {
    console.error('Error sending transaction:', error);
    throw error;
  }
}

export async function getTransactionHistory(address: string) {
  try {
    const { data: transactions, error } = await supabase
      .from('transactions')
      .select('*')
      .or(`from_address.eq.${address},to_address.eq.${address}`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return transactions;
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    throw error;
  }
}