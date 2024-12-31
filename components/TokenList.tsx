'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import TokenCard from './TokenCard';
import { Token, ComponentProps } from '@/types';

export default function TokenList({ factoryAddress, factoryAbi }: ComponentProps) {
 const [tokens, setTokens] = useState<Token[]>([]);

 useEffect(() => {
   const fetchTokens = async () => {
     const provider = new ethers.providers.Web3Provider(window.ethereum);
     const factory = new ethers.Contract(factoryAddress, factoryAbi, provider);
     
     const count = await factory.getAllResearchCount();
     const tokensData = [];
     
     for (let i = 0; i < count; i++) {
       const token = await factory.getResearchToken(i);
       tokensData.push(token);
     }
     setTokens(tokensData);
   };
   
   fetchTokens();
 }, [factoryAddress, factoryAbi]);

 return (
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
     {tokens.map((token, index) => (
       <TokenCard key={index} token={token} factoryAddress={factoryAddress} />
     ))}
   </div>
 );
}