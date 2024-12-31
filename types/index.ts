
  export interface Token {
    tokenAddress: string;
    name: string;
    symbol: string;
    researcher: string;
    timestamp: number;
  }
  
  export interface ComponentProps {
    factoryAddress: string;
    factoryAbi: any[];
  }