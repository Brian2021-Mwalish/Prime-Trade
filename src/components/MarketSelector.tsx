import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

interface MarketSelectorProps {
  markets: any[];
  selectedSymbol: string;
  onSelectSymbol: (symbol: string) => void;
  isLoading: boolean;
}

const MarketSelector: React.FC<MarketSelectorProps> = ({ 
  markets, 
  selectedSymbol, 
  onSelectSymbol,
  isLoading
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Group markets by market type
  const groupedMarkets: Record<string, any[]> = {};
  markets.forEach(market => {
    if (!groupedMarkets[market.market]) {
      groupedMarkets[market.market] = [];
    }
    groupedMarkets[market.market].push(market);
  });

  // Filter markets based on search query
  const filteredMarkets = searchQuery
    ? markets.filter(market => 
        market.display_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        market.market_display_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="relative">
      <button 
        type="button" 
        className="flex items-center justify-between w-full md:w-56 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm font-medium truncate">{selectedSymbol}</span>
        <ChevronDown size={18} className="ml-2" />
      </button>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full md:w-80 bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 py-1 max-h-96 overflow-y-auto">
          <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                placeholder="Search markets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-4">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : searchQuery ? (
            filteredMarkets.length > 0 ? (
              <div className="py-1">
                {filteredMarkets.map((market) => (
                  <button
                    key={market.symbol}
                    type="button"
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => {
                      onSelectSymbol(market.display_name);
                      setIsOpen(false);
                      setSearchQuery('');
                    }}
                  >
                    <div className="font-medium">{market.display_name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{market.market_display_name}</div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-sm text-gray-500 dark:text-gray-400">
                No markets found
              </div>
            )
          ) : (
            <div>
              {Object.keys(groupedMarkets).map((marketType) => (
                <div key={marketType} className="py-1">
                  <div className="px-3 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700">
                    {marketType.toUpperCase()}
                  </div>
                  {groupedMarkets[marketType].slice(0, 5).map((market) => (
                    <button
                      key={market.symbol}
                      type="button"
                      className={`w-full text-left px-4 py-2 text-sm ${
                        selectedSymbol === market.display_name
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => {
                        onSelectSymbol(market.display_name);
                        setIsOpen(false);
                      }}
                    >
                      <div className="font-medium">{market.display_name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{market.market_display_name}</div>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MarketSelector;