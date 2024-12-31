// lib/web3.ts
export const getProvider = () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      return new ethers.providers.Web3Provider(window.ethereum);
    }
    throw new Error('No Web3 provider found');
  };