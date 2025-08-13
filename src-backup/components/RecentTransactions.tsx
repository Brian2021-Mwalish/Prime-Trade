import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';

interface Transaction {
  id: number;
  type: string;
  asset: string;
  amount: number;
  profit: number;
  timestamp: Date;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Transactions</h2>
      
      <div className="space-y-3">
        {transactions.map((transaction) => (
          <div 
            key={transaction.id} 
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center">
              <div className={`p-2 mr-3 rounded-full ${
                transaction.profit >= 0 
                  ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
                  : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
              }`}>
                {transaction.profit >= 0 
                  ? <ArrowUpRight size={16} /> 
                  : <ArrowDownLeft size={16} />
                }
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  {transaction.type} {transaction.asset}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDistanceToNow(transaction.timestamp, { addSuffix: true })}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-sm font-medium ${
                transaction.profit >= 0 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {transaction.profit >= 0 ? '+' : ''}${transaction.profit.toFixed(2)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                ${transaction.amount.toFixed(2)}
              </p>
            </div>
          </div>
        ))}

        {transactions.length === 0 && (
          <div className="text-center py-6">
            <p className="text-gray-500 dark:text-gray-400">No recent transactions</p>
          </div>
        )}
      </div>
      
      {transactions.length > 0 && (
        <div className="mt-4">
          <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
            View all transactions
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;