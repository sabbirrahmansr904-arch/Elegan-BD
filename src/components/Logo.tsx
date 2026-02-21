import React from 'react';

interface LogoProps {
  className?: string;
  color?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-8 w-8", color = "currentColor" }) => {
  return (
    <svg 
      viewBox="0 0 400 240" 
      className={className} 
      fill={color} 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Top Bar */}
      <path d="M160 20 H360 L320 100 H120 Z" />
      {/* Middle Bar */}
      <path d="M40 110 H240 L200 190 H0 Z" />
      {/* Bottom Bar */}
      <path d="M120 200 H320 L280 280 H80 Z" transform="translate(0, -70)" />
      {/* Adjusted paths to match the image slant and positioning better */}
      <g transform="translate(20, 10)">
        <path d="M150 0 L350 0 L310 70 L110 70 Z" />
        <path d="M80 85 L280 85 L240 155 L40 155 Z" />
        <path d="M130 170 L330 170 L290 240 L90 240 Z" />
      </g>
    </svg>
  );
};

// Simplified version that looks exactly like the image
export const LogoIcon: React.FC<LogoProps> = ({ className = "h-8 w-auto", color = "currentColor" }) => {
  return (
    <svg 
      viewBox="0 0 400 250" 
      className={className} 
      fill={color} 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Top Bar */}
      <path d="M165 15 L365 15 L325 85 L125 85 Z" />
      {/* Middle Bar */}
      <path d="M95 95 L295 95 L255 165 L55 165 Z" />
      {/* Bottom Bar */}
      <path d="M140 175 L340 175 L300 245 L100 245 Z" />
    </svg>
  );
};
