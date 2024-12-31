// components/TokenList.tsx
'use client';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import TokenCard from './TokenCard';

interface TokenListProps {
  factoryAddress: string;
  factoryAbi: any;
}

export default function TokenList({ factoryAddress, factoryAbi }: TokenListProps) {
  const [tokens, setTokens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTokens();
  }, [factoryAddress]);

  const fetchTokens = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const factory = new ethers.Contract(factoryAddress, factoryAbi, provider);
      
      const count = await factory.getAllResearchCount();
      const tokenPromises = [];
      
      for (let i = 0; i < count; i++) {
        tokenPromises.push(factory.getResearchToken(i));
      }
      
      const tokens = await Promise.all(tokenPromises);
      setTokens(tokens);
    } catch (error) {
      console.error('Error fetching tokens:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-white mb-6">Research Meme Tokens</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tokens.map((token, index) => (
          <TokenCard key={index} token={token} />
        ))}
      </div>
    </div>
  );
}