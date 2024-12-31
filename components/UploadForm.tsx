'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { ethers } from 'ethers';
import { Button } from './Button';
import { ComponentProps } from '@/types';
import { generateMemeDescription } from '@/lib/claude';

interface FormData {
 name: string;
 symbol: string;
 initialSupply: string;
 tokenPrice: string;
 pdfFile: File | null;
}

export default function UploadForm({ factoryAddress, factoryAbi }: ComponentProps) {
 const [loading, setLoading] = useState(false);
 const [formData, setFormData] = useState<FormData>({
   name: '',
   symbol: '',
   initialSupply: '1000',
   tokenPrice: '0.1',
   pdfFile: null
 });


const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.pdfFile) return;
  
    setLoading(true);
    try {
      const pdfText = await formData.pdfFile.text();
      const memeDesc = await generateMemeDescription(pdfText);
  
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const factory = new ethers.Contract(factoryAddress, factoryAbi, signer);
  
      // Ensure all parameters are properly formatted
      const tx = await factory.createResearchToken(
        String(formData.name),
        String(formData.symbol),
        String("pdfHash"), // Placeholder
        String("imageHash"), // Placeholder
        String(memeDesc),
        ethers.utils.parseEther(formData.tokenPrice),
        ethers.BigNumber.from(formData.initialSupply)
      );
  
      await tx.wait();
      alert('Token created successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating token');
    } finally {
      setLoading(false);
    }
  };

 return (
   <form onSubmit={handleSubmit} className="space-y-6 bg-white/10 rounded-xl p-6">
     <h2 className="text-2xl font-bold text-white">Create Research Token</h2>
     <div className="space-y-4">
       <input
         type="text"
         placeholder="Token Name"
         value={formData.name}
         onChange={(e) => setFormData({...formData, name: e.target.value})}
         className="w-full p-2 rounded bg-white/20 text-white"
         required
       />
       <input
         type="text"
         placeholder="Token Symbol"
         value={formData.symbol}
         onChange={(e) => setFormData({...formData, symbol: e.target.value})}
         className="w-full p-2 rounded bg-white/20 text-white"
         required
       />
       <input
         type="file"
         accept=".pdf"
         onChange={(e) => setFormData({...formData, pdfFile: e.target.files?.[0] || null})}
         className="w-full p-2 rounded bg-white/20 text-white"
         required
       />
       <div className="flex space-x-4">
         <input
           type="number"
           placeholder="Initial Supply"
           value={formData.initialSupply}
           onChange={(e) => setFormData({...formData, initialSupply: e.target.value})}
           className="w-1/2 p-2 rounded bg-white/20 text-white"
           required
         />
         <input
           type="number"
           step="0.000000000000000001"
           placeholder="Token Price (ETH)"
           value={formData.tokenPrice}
           onChange={(e) => setFormData({...formData, tokenPrice: e.target.value})}
           className="w-1/2 p-2 rounded bg-white/20 text-white"
           required
         />
       </div>
     </div>
     <Button type="submit" loading={loading}>Create Token</Button>
   </form>
 );
}