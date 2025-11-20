import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Button({ children, isLoading, className = '', ...props }) {
  return (
    <button
      className={`button ${isLoading ? 'button-loading' : ''} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="button-loader-icon" />
      ) : (
        children
      )}
    </button>
  );
}