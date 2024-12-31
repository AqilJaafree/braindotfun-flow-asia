import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
}

export const Button = ({ children, loading, ...props }: ButtonProps) => (
  <button 
    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
    disabled={loading}
    {...props}
  >
    {loading ? 'Loading...' : children}
  </button>
);