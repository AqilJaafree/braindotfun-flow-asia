'use client';

import { useState } from 'react';
import { ethers } from 'ethers';
import { Button } from './Button';
import { Token } from '@/types';

interface TokenCardProps {
 token: Token;
 factoryAddress: string;
}

export default function TokenCard({ token, factoryAddress }: TokenCardProps) {
 const [loading, setLoading] = useState(false);

 const purchaseToken = async () => {
   setLoading(true);
   try {
     const provider = new ethers.providers.Web3Provider(window.ethereum);
     const signer = provider.getSigner();
     const contract = new ethers.Contract(token.tokenAddress, [
       'function buyTokens(uint256) payable'
     ], signer);

     const tx = await contract.buyTokens(1, {
       value: ethers.utils.parseEther('0.1')
     });
     await tx.wait();
     alert('Token purchased successfully!');
   } catch (error) {
     console.error('Error:', error);
     alert('Failed to purchase token');
   } finally {
     setLoading(false);
   }
 };

 return (
   <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
     <h3 className="text-xl font-bold text-white mb-2">{token.name}</h3>
     <p className="text-gray-300 mb-2">Symbol: {token.symbol}</p>
     <p className="text-gray-300 mb-2">Researcher: {token.researcher}</p>
     <Button onClick={purchaseToken} loading={loading}>
       Purchase Token
     </Button>
   </div>
 );
}