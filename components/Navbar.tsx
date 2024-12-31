'use client';
import { useState } from 'react';
import { ConnectButton } from './WalletConnect';
import Link from 'next/link';
import Image from 'next/image';
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-black/30 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
        <div className="flex items-center">
           <Link href="/" className="flex items-center gap-2">
             <Image 
               src="/BrainDotFun.jpg" // Place your image in public folder
               alt="Brain Logo"
               width={40}
               height={40}
               className="rounded-full"
             />
             <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
               Braindotfun
             </span>
           </Link>
         </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/explore" className="text-gray-300 hover:text-white">
              Explore
            </Link>
            <Link href="/create" className="text-gray-300 hover:text-white">
              Create
            </Link>
            <Link href="/my-tokens" className="text-gray-300 hover:text-white">
              My Tokens
            </Link>
            <ConnectButton />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/explore"
                className="block px-3 py-2 text-gray-300 hover:text-white"
              >
                Explore
              </Link>
              <Link
                href="/create"
                className="block px-3 py-2 text-gray-300 hover:text-white"
              >
                Create
              </Link>
              <Link
                href="/my-tokens"
                className="block px-3 py-2 text-gray-300 hover:text-white"
              >
                My Tokens
              </Link>
              <div className="px-3 py-2">
                <ConnectButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}