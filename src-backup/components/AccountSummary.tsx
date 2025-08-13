import React from 'react';
import { BarChart2, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const AccountSummary: React.FC = () => {
  // Sample data for demonstration
  const accountData = {
    equityChange: 3.8,
    todayProfit: 324.50,
    weeklyChange: 1280.75,
    weeklyChangePercent: 5.2,
  };

  // Sample trading activity data
  const tradingActivity = [
    { day: 'Mon', profit: 240.50 },
    { day: 'Tue', profit: -120.30 },
    { day: 'Wed', profit: 320.80 },
    { day: 'Thu', profit: -85.20 },
    { day: 'Fri', profit: 178.60 },
    { day: 'Sat', profit: 120.40 },
    { day: 'Sun', profit: 95.70 },
  ];

  // Calculate max value for chart scaling
  const maxProfit = Math.max(...tradingActivity.map(day => Math.abs(day.profit)));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Account Summary</h2>
        <div className="flex items-center text-sm">
          <span className={`flex items-center ${accountData.equityChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {accountData.equityChange >= 0 
              ? <ArrowUpRight size={16} className="mr-1" /> 
              : <ArrowDownRight size={16} className="mr-1" />
            }
            {accountData.equityChange}% today
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Today's summary */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Today's Trading</h3>
          
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-300">Profit/Loss</span>
              <span className={`font-medium ${accountData.todayProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {accountData.todayProfit >= 0 ? '+' : ''}${accountData.todayProfit.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-300">Weekly P&L</span>
              <span className={`font-medium ${accountData.weeklyChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {accountData.weeklyChange >= 0 ? '+' : ''}${accountData.weeklyChange.toFixed(2)}
                <span className="ml-1 text-xs">
                  ({accountData.weeklyChangePercent >= 0 ? '+' : ''}{accountData.weeklyChangePercent}%)
                </span>
              </span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-300">Open Positions</span>
              <span className="font-medium text-gray-900 dark:text-white">8</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">Pending Orders</span>
              <span className="font-medium text-gray-900 dark:text-white">3</span>
            </div>
          </div>
        </div>

        {/* Weekly activity chart */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">7-Day Activity</h3>
          
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 h-[148px] flex items-end justify-between">
            {tradingActivity.map((day, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className={`w-8 ${day.profit >= 0 ? 'bg-green-500 dark:bg-green-600' : 'bg-red-500 dark:bg-red-600'}`} 
                  style={{ 
                    height: `${Math.abs(day.profit) / maxProfit * 80}px`,
                    borderTopLeftRadius: '3px',
                    borderTopRightRadius: '3px',
                  }}
                ></div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">{day.day}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSummary;