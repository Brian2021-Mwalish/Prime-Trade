import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  Play, 
  Square, 
  Save,
  Download,
  Upload,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Maximize,
  Settings,
  Search
} from 'lucide-react';
import MonacoEditor from '@monaco-editor/react';

const BotBuilder = () => {
  const { user } = useAuth();
  const [isRunning, setIsRunning] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState('Derived');
  const [selectedSymbol, setSelectedSymbol] = useState('Volatility 10 Index');
  const [tradeType, setTradeType] = useState('Rise/Fall');
  const [duration, setDuration] = useState('5');
  const [stake, setStake] = useState('10');

  const handleRun = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Top toolbar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleRun}
              className={`px-4 py-2 rounded-lg font-medium flex items-center ${
                isRunning
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isRunning ? <Square size={16} className="mr-2" /> : <Play size={16} className="mr-2" />}
              {isRunning ? 'Stop' : 'Run'}
            </button>
            
            <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <Save size={20} />
            </button>
            <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <Download size={20} />
            </button>
            <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <Upload size={20} />
            </button>
            <div className="border-l border-gray-200 dark:border-gray-700 h-6 mx-2" />
            <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <Undo size={20} />
            </button>
            <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <Redo size={20} />
            </button>
            <div className="border-l border-gray-200 dark:border-gray-700 h-6 mx-2" />
            <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <ZoomIn size={20} />
            </button>
            <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <ZoomOut size={20} />
            </button>
            <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <Maximize size={20} />
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <Settings size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex">
        {/* Left sidebar - Blocks menu */}
        <div className="w-64 bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
          <div className="p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search blocks..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
          
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Trade Parameters</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Market</label>
                <select
                  value={selectedMarket}
                  onChange={(e) => setSelectedMarket(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option>Derived</option>
                  <option>Forex</option>
                  <option>Synthetic</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Symbol</label>
                <select
                  value={selectedSymbol}
                  onChange={(e) => setSelectedSymbol(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option>Volatility 10 Index</option>
                  <option>Volatility 25 Index</option>
                  <option>Volatility 50 Index</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Trade Type</label>
                <select
                  value={tradeType}
                  onChange={(e) => setTradeType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option>Rise/Fall</option>
                  <option>Higher/Lower</option>
                  <option>Touch/No Touch</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Duration (ticks)</label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Stake ($)</label>
                <input
                  type="number"
                  value={stake}
                  onChange={(e) => setStake(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main workspace */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 bg-white dark:bg-gray-800">
            <MonacoEditor
              height="100%"
              defaultLanguage="javascript"
              defaultValue="// Your bot trading strategy
const strategy = {
  name: 'Simple MA Crossover',
  description: 'Buy when fast MA crosses above slow MA',
  
  init() {
    this.fastMA = 0;
    this.slowMA = 0;
  },
  
  onTick(data) {
    // Calculate MAs
    this.fastMA = calculateMA(data, 10);
    this.slowMA = calculateMA(data, 20);
    
    // Check for crossover
    if (this.fastMA > this.slowMA) {
      buy();
    } else {
      sell();
    }
  }
};"
              theme={user?.darkMode ? 'vs-dark' : 'light'}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                readOnly: false,
                automaticLayout: true,
              }}
            />
          </div>
          
          {/* Bottom panel - Console/Logs */}
          <div className="h-48 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Console</h3>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                Clear
              </button>
            </div>
            <div className="h-32 overflow-y-auto font-mono text-sm bg-white dark:bg-gray-800 rounded-lg p-2">
              <div className="text-gray-600 dark:text-gray-400">
                {'>'} Bot initialized
                <br />
                {'>'} Waiting for market data...
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar - Strategy info */}
        <div className="w-64 bg-gray-100 dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Strategy Information</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Total Trades</label>
              <div className="text-lg font-medium text-gray-900 dark:text-white">0</div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Win Rate</label>
              <div className="text-lg font-medium text-green-600 dark:text-green-400">0%</div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Profit/Loss</label>
              <div className="text-lg font-medium text-gray-900 dark:text-white">$0.00</div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Duration</label>
              <div className="text-lg font-medium text-gray-900 dark:text-white">00:00:00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotBuilder;