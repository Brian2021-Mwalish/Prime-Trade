import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { ArrowUpRight, ArrowDownRight, BarChart, Clock, DollarSign } from 'lucide-react';
import MarketOverviewCard from '../components/MarketOverviewCard';
import AccountSummary from '../components/AccountSummary';
import RecentTransactions from '../components/RecentTransactions';
import WatchlistWidget from '../components/WatchlistWidget';

const Home = () => {
  const { user, api } = useAuth();
  const [activeMarkets, setActiveMarkets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActiveMarkets = async () => {
      if (!api) return;

      try {
        // Get active symbols
        const response = await api.market().activeSymbols();
        if (response.active_symbols) {
          // Get the first 5 forex symbols
          const forexSymbols = response.active_symbols
            .filter((symbol: any) => symbol.market === 'forex')
            .slice(0, 5);
          setActiveMarkets(forexSymbols);
        }
      } catch (error) {
        console.error('Error fetching active symbols:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActiveMarkets();
  }, [api]);

  const recentTransactions = [
    { id: 1, type: 'Buy', asset: 'EUR/USD', amount: 100, profit: 15.25, timestamp: new Date(Date.now() - 35 * 60000) },
    { id: 2, type: 'Sell', asset: 'BTC/USD', amount: 500, profit: -23.80, timestamp: new Date(Date.now() - 120 * 60000) },
    { id: 3, type: 'Buy', asset: 'GBP/JPY', amount: 200, profit: 35.50, timestamp: new Date(Date.now() - 240 * 60000) },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back, {user?.name || 'Trader'}</p>
      </header>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Balance</p>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1">$24,568.80</h3>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-md">
              <DollarSign className="text-green-600 dark:text-green-400" size={20} />
            </div>
          </div>
          <div className="flex items-center mt-3">
            <span className="text-green-600 dark:text-green-400 text-sm font-medium flex items-center">
              <ArrowUpRight size={16} className="mr-1" /> +2.5%
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">vs last week</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Open Positions</p>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1">8</h3>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-md">
              <BarChart className="text-blue-600 dark:text-blue-400" size={20} />
            </div>
          </div>
          <div className="flex items-center mt-3">
            <span className="text-red-600 dark:text-red-400 text-sm font-medium flex items-center">
              <ArrowDownRight size={16} className="mr-1" /> -1.2%
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">vs last week</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Profit/Loss</p>
              <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mt-1">+$1,240.56</h3>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-md">
              <Clock className="text-purple-600 dark:text-purple-400" size={20} />
            </div>
          </div>
          <div className="flex items-center mt-3">
            <span className="text-green-600 dark:text-green-400 text-sm font-medium flex items-center">
              <ArrowUpRight size={16} className="mr-1" /> +5.3%
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">vs last month</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Available Margin</p>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1">$18,345.20</h3>
            </div>
            <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-md">
              <DollarSign className="text-amber-600 dark:text-amber-400" size={20} />
            </div>
          </div>
          <div className="flex items-center mt-3">
            <span className="text-amber-600 dark:text-amber-400 text-sm font-medium">70.2%</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">of total balance</span>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Market overview */}
        <div className="lg:col-span-2 space-y-6">
          <MarketOverviewCard />
          <AccountSummary />
        </div>

        {/* Right column - Watchlist & recent transactions */}
        <div className="space-y-6">
          <WatchlistWidget 
            symbols={activeMarkets} 
            isLoading={isLoading}
          />
          <RecentTransactions transactions={recentTransactions} />
        </div>
      </div>
    </div>
  );
};

export default Home;