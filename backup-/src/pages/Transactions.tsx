import React, { useState } from 'react';
import { Calendar, Download, Filter, Search } from 'lucide-react';
import { format, subDays } from 'date-fns';

const Transactions = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({
    from: format(subDays(new Date(), 30), 'yyyy-MM-dd'),
    to: format(new Date(), 'yyyy-MM-dd'),
  });

  // Sample transactions data
  const transactions = [
    {
      id: 't1',
      type: 'deposit',
      amount: 5000,
      currency: 'USD',
      status: 'completed',
      date: new Date(2025, 2, 15),
      description: 'Bank transfer deposit',
    },
    {
      id: 't2',
      type: 'trade',
      amount: -150,
      currency: 'USD',
      status: 'completed',
      date: new Date(2025, 2, 14),
      description: 'EUR/USD sell position closed',
    },
    {
      id: 't3',
      type: 'trade',
      amount: 320.50,
      currency: 'USD',
      status: 'completed',
      date: new Date(2025, 2, 12),
      description: 'GBP/JPY buy position closed',
    },
    {
      id: 't4',
      type: 'withdrawal',
      amount: -1000,
      currency: 'USD',
      status: 'processing',
      date: new Date(2025, 2, 10),
      description: 'Bank transfer withdrawal',
    },
    {
      id: 't5',
      type: 'trade',
      amount: -78.25,
      currency: 'USD',
      status: 'completed',
      date: new Date(2025, 2, 8),
      description: 'USD/JPY buy position closed',
    },
    {
      id: 't6',
      type: 'deposit',
      amount: 2500,
      currency: 'USD',
      status: 'completed',
      date: new Date(2025, 2, 5),
      description: 'Credit card deposit',
    },
    {
      id: 't7',
      type: 'trade',
      amount: 450.75,
      currency: 'USD',
      status: 'completed',
      date: new Date(2025, 2, 3),
      description: 'XAU/USD sell position closed',
    },
  ];

  // Filter transactions based on active filter and search query
  const filteredTransactions = transactions.filter(transaction => {
    if (activeFilter === 'deposits' && transaction.type !== 'deposit') return false;
    if (activeFilter === 'withdrawals' && transaction.type !== 'withdrawal') return false;
    if (activeFilter === 'trades' && transaction.type !== 'trade') return false;
    
    const fromDate = new Date(dateRange.from);
    const toDate = new Date(dateRange.to);
    toDate.setHours(23, 59, 59, 999); // End of the day
    
    if (transaction.date < fromDate || transaction.date > toDate) return false;
    
    if (searchQuery && !transaction.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    return true;
  });

  // Get total amounts for different transaction types
  const totalDeposits = transactions
    .filter(t => t.type === 'deposit')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalWithdrawals = transactions
    .filter(t => t.type === 'withdrawal')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalTrades = transactions
    .filter(t => t.type === 'trade')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Transactions</h1>
        <p className="text-gray-600 dark:text-gray-400">View your account transaction history</p>
      </header>

      {/* Transaction summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-100 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Deposits</p>
          <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mt-1">
            +${totalDeposits.toFixed(2)}
          </h3>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-100 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Withdrawals</p>
          <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mt-1">
            ${totalWithdrawals.toFixed(2)}
          </h3>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-100 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Trading P&L</p>
          <h3 className={`text-xl font-bold mt-1 ${
            totalTrades >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}>
            {totalTrades >= 0 ? '+' : ''}${totalTrades.toFixed(2)}
          </h3>
        </div>
      </div>

      {/* Transaction filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
                activeFilter === 'all'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter('deposits')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
                activeFilter === 'deposits'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Deposits
            </button>
            <button
              onClick={() => setActiveFilter('withdrawals')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
                activeFilter === 'withdrawals'
                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Withdrawals
            </button>
            <button
              onClick={() => setActiveFilter('trades')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
                activeFilter === 'trades'
                  ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Trades
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2 items-center">
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg">
              <span className="pl-3 pr-1 text-gray-500 dark:text-gray-400">
                <Calendar size={16} />
              </span>
              <input
                type="date"
                value={dateRange.from}
                onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
                className="bg-transparent border-0 py-1.5 pl-1 pr-2 text-sm text-gray-900 dark:text-white focus:ring-0"
              />
              <span className="text-gray-400">to</span>
              <input
                type="date"
                value={dateRange.to}
                onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
                className="bg-transparent border-0 py-1.5 pl-1 pr-2 text-sm text-gray-900 dark:text-white focus:ring-0"
              />
            </div>
            
            <div className="relative flex-grow max-w-xs">
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
            </div>
            
            <button className="flex items-center gap-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>

        {/* Transactions table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {transaction.date.toLocaleDateString()} {transaction.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      transaction.type === 'deposit' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                        : transaction.type === 'withdrawal'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>
                      {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    transaction.amount > 0 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)} {transaction.currency}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      transaction.status === 'completed' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;