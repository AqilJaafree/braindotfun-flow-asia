'use client';
import { useState } from 'react';
import { ethers } from 'ethers';
import { ChangeEvent } from 'react';
import { Web3Storage } from 'web3.storage';
import { generateMemeDescription } from '@/lib/claude';
import { Button } from './Button';
import { FileInput } from './FileInput';

interface UploadFormProps {
  factoryAddress: string;
  factoryAbi: any;
}

export default function UploadForm({ factoryAddress, factoryAbi }: UploadFormProps) {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [memeImage, setMemeImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [initialSupply, setInitialSupply] = useState('1000');
  const [tokenPrice, setTokenPrice] = useState('0.1');
  // Event handlers with proper types
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0] || null;
  setPdfFile(file);
  };
  const uploadToIPFS = async (file: File) => {
    const client = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN! });
    const cid = await client.put([file]);
    return cid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pdfFile || !memeImage) return;

    setLoading(true);
    try {
      // Upload files to IPFS
      const pdfCid = await uploadToIPFS(pdfFile);
      const imageCid = await uploadToIPFS(memeImage);

      // Generate meme description using Claude
      const pdfText = await pdfFile.text();
      const memeDesc = await generateMemeDescription(pdfText);

      // Create token
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const factory = new ethers.Contract(factoryAddress, factoryAbi, signer);

      const tx = await factory.createResearchToken(
        tokenName,
        tokenSymbol,
        pdfCid,
        imageCid,
        memeDesc,
        ethers.utils.parseEther(tokenPrice),
        ethers.utils.parseUnits(initialSupply, 18)
      );

      await tx.wait();
      alert('Token created successfully!');
    } catch (error) {
      console.error('Error creating token:', error);
      alert('Error creating token. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white/10 rounded-xl p-6 backdrop-blur-sm">
      <h2 className="text-2xl font-bold text-white">Create Research Meme Token</h2>
      
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Token Name"
          value={tokenName}
          onChange={(e) => setTokenName(e.target.value)}
          className="w-full p-2 rounded bg-white/20 text-white placeholder:text-gray-400"
          required
        />
        
        <input
          type="text"
          placeholder="Token Symbol"
          value={tokenSymbol}
          onChange={(e) => setTokenSymbol(e.target.value)}
          className="w-full p-2 rounded bg-white/20 text-white placeholder:text-gray-400"
          required
        />
        
        <FileInput
          label="Research Paper (PDF)"
          accept=".pdf"
          onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
          required
        />
        
        <FileInput
          label="Meme Image"
          accept="image/*"
          onChange={(e) => setMemeImage(e.target.files?.[0] || null)}
          required
        />
        
        <div className="flex space-x-4">
          <input
            type="number"
            placeholder="Initial Supply"
            value={initialSupply}
            onChange={(e) => setInitialSupply(e.target.value)}
            className="w-1/2 p-2 rounded bg-white/20 text-white placeholder:text-gray-400"
            required
          />
          
          <input
            type="number"
            step="0.000000000000000001"
            placeholder="Token Price (ETH)"
            value={tokenPrice}
            onChange={(e) => setTokenPrice(e.target.value)}
            className="w-1/2 p-2 rounded bg-white/20 text-white placeholder:text-gray-400"
            required
          />
        </div>
      </div>

      <Button type="submit" loading={loading}>
        Create Token
      </Button>
    </form>
  );
}