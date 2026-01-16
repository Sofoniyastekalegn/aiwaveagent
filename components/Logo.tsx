
import React from 'react';

const Logo: React.FC<{ className?: string; onClick?: () => void }> = ({ className = "w-8 h-8", onClick }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={`${className} ${onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
    onClick={onClick}
  >
    <path 
      d="M2 12C2 12 5 7 12 7C19 7 22 12 22 12C22 12 19 17 12 17C5 17 2 12 2 12Z" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="opacity-20"
    />
    <path 
      d="M2 12C4 10 7 9 10 12C13 15 16 14 19 12" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M5 16C7 14 10 13 13 16C16 19 19 18 22 16" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="opacity-40"
    />
  </svg>
);

export default Logo;
