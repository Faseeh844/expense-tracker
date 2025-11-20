import React from 'react';

export default function Input({ label, id, ...props }) {
  const inputId = id || `input-${label.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div className="input-container">
      {label && <label htmlFor={inputId} className="input-label">{label}</label>}
      <input id={inputId} className="input-field" {...props} />
    </div>
  );
}