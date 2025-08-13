import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock, 
  AlertCircle, 
  Filter, 
  Search,
  SlidersHorizontal
} from 'lucide-react';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample position data
  const positions = [
    { 
      id: 'p1', 
      type: 'buy', 
      symbol: 'EUR/USD', 
      openPrice: 1.0832, 
      currentPrice: 1.0841, 
      amount: 1000, 
      profit: 9.00, 
      profitPercentage: 0.83, 
      openTime: new Date(Date.now() - 6 * 60 * 60 * 1000) 
    },
    { 
      id: 'p2', 
      type: 'sell', 
      symbol: 'GBP/JPY', 
      openPrice: 180.542, 
      currentPrice: 180.125, 
      amount: 500, 
      profit: 208.50, 
      profitPercentage: 0.23, 
      openTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) 
    },
    { 
      id: 'p3', 
      type: 'buy', 
      symbol: 'XAU/USD', 
      openPrice: 2145.32, 
      currentPrice: 2132.15, 
      amount: 200, 
      profit: -2634.00, 
      profitPercentage: -0.61, 
      openTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) 
    },
    { 
      id: 'p4', 
      type: 'buy', 
      symbol: 'AUD/CAD', 
      openPrice: 0.8925, 
      currentPrice: 0.8937, 
      amount: 800, 
      profit: 9.60, 
      profitPercentage: 0.13, 
      openTime: new Date(Date.now() - 12 * 60 * 60 * 1000) 
    },
    { 
      id: 'p5', 
      type: 'sell', 
      symbol: 'USD/JPY', 
      openPrice: 143.86, 
      currentPrice: 144.02, 
      amount: 1500, 
      profit: -350.40, 
      profitPercentage: -0.11, 
      openTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) 
    },
  ];

  // Filter positions based on active filter
  const filteredPositions = positions.filter(position => {
    if (activeFilter === 'profit' && position.profit <= 0) return false;
    if (activeFilter === 'loss' && position.profit > 0) return false;
    if (searchQuery && !position.symbol.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Calculate total portfolio stats
  const totalInvested = positions.reduce((sum, pos) => sum + pos.amount, 0);
  const totalProfit = positions.reduce((sum, pos) => sum + pos.profit, 0);
  const profitablePositions = positions.filter(pos => pos.profit > 0).length;
  const averageProfitPercentage = totalProfit / totalInvested * 100;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Portfolio</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your open positions</p>
      </header>

      {/* Portfolio summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-100 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Invested</p>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1">${totalInvested.toFixed(2)}</h3>
          <div className="flex items-center mt-3">
            <span className="text-xs text-gray-500 dark:text-gray-400">Across {positions.length} positions</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-100 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total P&L</p>
          <h3 className={`text-xl font-bold mt-1 ${totalProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {totalProfit >= 0 ? '+' : ''}{totalProfit.toFixed(2)} USD
          </h3>
          <div className="flex items-center mt-3">
            <span className={`text-sm font-medium flex items-center ${totalProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {totalProfit >= 0 ? <ArrowUpRight size={16} className="mr-1" /> : <ArrowDownRight size={16} className="mr-1" />}
              {averageProfitPercentage.toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-100 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Win Rate</p>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1">
            {positions.length > 0 ? ((profitablePositions / positions.length) * 100).toFixed(1) : 0}%
          </h3>
          <div className="flex items-center mt-3">
            <span className="text-xs text-gray-500 dark:text-gray-400">{profitablePositions} of {positions.length} positions</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-100 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Position Time</p>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1">3.2 days</h3>
          <div className="flex items-center mt-3">
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
              <Clock size={14} className="mr-1" /> Avg. holding period
            </span>
          </div>
        </div>
      </div>

      {/* Position filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
                activeFilter === 'all'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              All Positions
            </button>
            <button
              onClick={() => setActiveFilter('profit')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
                activeFilter === 'profit'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              In Profit
            </button>
            <button
              onClick={() => setActiveFilter('loss')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
                activeFilter === 'loss'
                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              In Loss
            </button>
          </div>
          
          <div className="flex w-full sm:w-auto">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search symbols..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
            </div>
            <button className="ml-2 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">
              <SlidersHorizontal size={20} />
            </button>
          </div>
        </div>

        {/* Positions table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Symbol</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Open Price</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Current Price</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Profit/Loss</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Open Time</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredPositions.length > 0 ? (
                filteredPositions.map((position) => (
                  <tr key={position.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{position.symbol}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        position.type === 'buy' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {position.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{position.openPrice.toFixed(5)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{position.currentPrice.toFixed(5)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">${position.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className={position.profit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                        <span className="font-medium">${Math.abs(position.profit).toFixed(2)}</span>
                        <span className="ml-1 text-xs">({position.profit >= 0 ? '+' : '-'}{Math.abs(position.profitPercentage).toFixed(2)}%)</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {position.openTime.toLocaleDateString()} {position.openTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">Close</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col items-center">
                      <AlertCircle size={24} className="mb-2 text-gray-400 dark:text-gray-500" />
                      <p>No positions found matching your filters.</p>
                      {activeFilter !== 'all' && (
                        <button 
                          className="mt-2 text-blue-600 dark:text-blue-400 hover:underline"
                          onClick={() => setActiveFilter('all')}
                        >
                          Clear filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;