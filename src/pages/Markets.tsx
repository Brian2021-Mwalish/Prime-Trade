import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Search, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

const Markets = () => {
  const { api } = useAuth();
  const [marketData, setMarketData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMarketType, setActiveMarketType] = useState('forex');
  const [sortConfig, setSortConfig] = useState({ key: 'symbol', direction: 'asc' });

  useEffect(() => {
    const fetchMarketData = async () => {
      if (!api) return;

      try {
        const response = await api.market().activeSymbols();
        if (response.active_symbols) {
          // Add mock price change data
          const symbolsWithChanges = response.active_symbols.map((symbol: any) => {
            const priceChange = (Math.random() * 2 - 1) * 2; // Random value between -2% and +2%
            return {
              ...symbol,
              price: parseFloat(symbol.spot || '0'),
              change: priceChange,
              changePercent: priceChange,
              volume: Math.floor(Math.random() * 10000000),
            };
          });
          setMarketData(symbolsWithChanges);
        }
      } catch (error) {
        console.error('Error fetching active symbols:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarketData();
  }, [api]);

  useEffect(() => {
    // Filter and sort data
    let filtered = [...marketData];
    
    // Filter by market type
    filtered = filtered.filter(item => item.market === activeMarketType);
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        item => item.display_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Sort data
    filtered.sort((a, b) => {
      if (sortConfig.key === 'symbol') {
        return sortConfig.direction === 'asc'
          ? a.display_name.localeCompare(b.display_name)
          : b.display_name.localeCompare(a.display_name);
      } else if (sortConfig.key === 'price') {
        return sortConfig.direction === 'asc'
          ? a.price - b.price
          : b.price - a.price;
      } else if (sortConfig.key === 'change') {
        return sortConfig.direction === 'asc'
          ? a.change - b.change
          : b.change - a.change;
      } else if (sortConfig.key === 'volume') {
        return sortConfig.direction === 'asc'
          ? a.volume - b.volume
          : b.volume - a.volume;
      }
      return 0;
    });
    
    setFilteredData(filtered);
  }, [marketData, searchQuery, activeMarketType, sortConfig]);

  const handleSort = (key: string) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Market types
  const marketTypes = [
    { id: 'forex', name: 'Forex' },
    { id: 'indices', name: 'Indices' },
    { id: 'commodities', name: 'Commodities' },
    { id: 'synthetic_index', name: 'Synthetic' },
    { id: 'cryptocurrency', name: 'Crypto' },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Markets</h1>
        <p className="text-gray-600 dark:text-gray-400">Explore available markets and instruments</p>
      </header>

      {/* Market filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {marketTypes.map(market => (
              <button
                key={market.id}
                onClick={() => setActiveMarketType(market.id)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
                  activeMarketType === market.id
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {market.name}
              </button>
            ))}
          </div>
          
          <div className="relative w-full sm:w-auto max-w-xs">
            <input
              type="text"
              placeholder="Search markets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => handleSort('symbol')}
                  >
                    <div className="flex items-center">
                      Symbol
                      {sortConfig.key === 'symbol' && (
                        <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => handleSort('price')}
                  >
                    <div className="flex items-center">
                      Price
                      {sortConfig.key === 'price' && (
                        <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => handleSort('change')}
                  >
                    <div className="flex items-center">
                      Change (24h)
                      {sortConfig.key === 'change' && (
                        <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => handleSort('volume')}
                  >
                    <div className="flex items-center">
                      Volume
                      {sortConfig.key === 'volume' && (
                        <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredData.map((market) => (
                  <tr key={market.symbol} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{market.display_name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {market.price.toFixed(5)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`flex items-center text-sm ${
                        market.change >= 0
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {market.change >= 0 
                          ? <TrendingUp size={16} className="mr-1" />
                          : <TrendingDown size={16} className="mr-1" />
                        }
                        {market.change >= 0 ? '+' : ''}{market.changePercent.toFixed(2)}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {market.volume.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
                        Trade
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Markets;