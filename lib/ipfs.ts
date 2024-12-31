// lib/ipfs.ts
import { Web3Storage } from 'web3.storage';

export const getIPFSClient = () => {
  return new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN! });
};