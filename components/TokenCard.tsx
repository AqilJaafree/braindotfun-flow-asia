'use client';
import { useState } from 'react';
import { ethers } from 'ethers';
import Image from 'next/image';
import { Button } from './Button';

interface TokenCardProps {
  token: {
    tokenAddress: string;
    name: string;
    symbol: string;
    researcher: string;
    imageHash: string;
    memeDescription: string;
    tokenPrice: string;
  };
}

export default function TokenCard({ token }: TokenCardProps) {
  const [loading, setLoading] = useState(false);

  const buyTokens = async () => {
    setLoading(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const tokenContract = new ethers.Contract(
        token.tokenAddress,
        ['function buyTokens(uint256) payable'],
        signer
      );

      const tx = await tokenContract.buyTokens(1, {
        value: token.tokenPrice
      });
      await tx.wait();
      alert('Purchase successful!');
    } catch (error) {
      console.error('Error buying tokens:', error);
      alert('Error buying tokens. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
      <div className="aspect-square relative overflow-hidden rounded-lg mb-4">
        <Image
          src={`https://${token.imageHash}.ipfs.dweb.link`}
          alt={token.name}
          fill
          className="object-cover"
        />
      </div>
      
      <h3 className="text-xl font-bold text-white mb-2">{token.name}</h3>
      <p className="text-gray-300 mb-4">{token.memeDescription}</p>
      
      <div className="flex justify-between items-center">
        <div className="text-gray-300">
          <p>Symbol: {token.symbol}</p>
          <p>Price: {ethers.utils.formatEther(token.tokenPrice)} ETH</p>
        </div>
        <Button onClick={buyTokens} loading={loading}>
          Buy Token
        </Button>
      </div>
    </div>
  );
}