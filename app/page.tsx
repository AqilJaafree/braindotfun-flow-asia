// app/page.tsx
'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import UploadForm from '@/components/UploadForm';
import TokenList from '@/components/TokenList';

const FACTORY_ADDRESS = '0xd18D1D3a8912c054BC0f2DCFb68B9795cC58DD6F';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <UploadForm factoryAddress={FACTORY_ADDRESS} factoryAbi={[]} />
        <TokenList factoryAddress={FACTORY_ADDRESS} factoryAbi={[]} />
      </div>
    </main>
  );
}