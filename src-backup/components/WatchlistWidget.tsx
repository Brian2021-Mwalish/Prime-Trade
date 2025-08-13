import React from 'react';
import { Star, TrendingUp, TrendingDown, PlusCircle } from 'lucide-react';

interface WatchlistWidgetProps {
  symbols: any[];
  isLoading: boolean;
}

const WatchlistWidget: React.FC<WatchlistWidgetProps> = ({ symbols, isLoading }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Watchlist</h2>
        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
          <PlusCircle size={18} />
        </button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="space-y-2">
          {symbols.length > 0 ? (
            symbols.map((symbol, index) => {
              // Generate random price data for demo
              const basePrice = parseFloat(symbol.spot || '1.0000');
              const change = (Math.random() * 2 - 1) * 2; // Random value between -2% and +2%
              
              return (
                <div 
                  key={symbol.symbol || index} 
                  className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg group transition-colors"
                >
                  <div className="flex items-center">
                    <div className="mr-2 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Star size={16} />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">{symbol.display_name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{symbol.market_display_name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{basePrice.toFixed(5)}</p>
                    <p className={`text-xs flex items-center justify-end ${
                      change >= 0
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {change >= 0 
                        ? <TrendingUp size={12} className="mr-1" /> 
                        : <TrendingDown size={12} className="mr-1" />
                      }
                      {change >= 0 ? '+' : ''}{change.toFixed(2)}%
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500 dark:text-gray-400">No symbols in watchlist</p>
              <button className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-center mx-auto">
                <PlusCircle size={14} className="mr-1" /> Add symbols
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WatchlistWidget;