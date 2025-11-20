import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function Alert({ children }) {
  return (
    <div className="alert">
      <AlertCircle className="alert-icon" />
      <span>{children}</span>
    </div>
  );
}