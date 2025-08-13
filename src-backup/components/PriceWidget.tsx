import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface PriceWidgetProps {
  currentPrice: {
    bid: number;
    ask: number;
  };
}

const PriceWidget: React.FC<PriceWidgetProps> = ({ currentPrice }) => {
  const spread = (currentPrice.ask - currentPrice.bid) / currentPrice.bid * 10000; // spread in pips
  
  // For demonstration, we'll simulate a price direction based on random data
  const priceDirection = Math.random() > 0.5 ? 'up' : 'down';
  
  return (
    <div className="flex items-center space-x-4">
      <div className="text-right">
        <div className="text-xs text-gray-500 dark:text-gray-400">Bid</div>
        <div className="flex items-center text-sm font-semibold text-red-600 dark:text-red-400">
          {currentPrice.bid.toFixed(5)}
          {priceDirection === 'down' && (
            <ArrowDownRight size={16} className="ml-1" />
          )}
        </div>
      </div>
      
      <div className="text-center bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
        <div className="text-xs text-gray-500 dark:text-gray-400">Spread</div>
        <div className="text-xs font-medium text-gray-800 dark:text-gray-200">
          {spread.toFixed(1)} pips
        </div>
      </div>
      
      <div>
        <div className="text-xs text-gray-500 dark:text-gray-400">Ask</div>
        <div className="flex items-center text-sm font-semibold text-green-600 dark:text-green-400">
          {currentPrice.ask.toFixed(5)}
          {priceDirection === 'up' && (
            <ArrowUpRight size={16} className="ml-1" />
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceWidget;