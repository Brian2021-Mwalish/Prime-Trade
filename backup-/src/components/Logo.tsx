import React, { useState } from 'react';
import { BarChart2 } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div className={`flex items-center ${className}`}>
        <div className="bg-red-600 p-2 rounded">
          <BarChart2 className="text-white" size={24} />
        </div>
        <span className="ml-2 text-xl font-semibold text-red-600 dark:text-red-400">Prime Trades</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/logo-black.png"
        alt="Prime Trades Logo" 
        className="h-8 dark:hidden"
        onError={() => setImageError(true)}
      />
      <img 
        src="/logo-white.png"
        alt="Prime Trades Logo" 
        className="h-8 hidden dark:block"
        onError={() => setImageError(true)}
      />
    </div>
  );
};

export default Logo;