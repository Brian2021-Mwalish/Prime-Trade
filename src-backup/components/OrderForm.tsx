import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

interface OrderFormProps {
  symbol: string;
  currentPrice: {
    bid: number;
    ask: number;
  };
}

const OrderForm: React.FC<OrderFormProps> = ({ symbol, currentPrice }) => {
  const { balance, currency } = useAuth();
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [direction, setDirection] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState<number>(100);
  const [limitPrice, setLimitPrice] = useState<string>('');
  const [takeProfitPrice, setTakeProfitPrice] = useState<string>('');
  const [stopLossPrice, setStopLossPrice] = useState<string>('');

  // Calculate estimated profit based on simple calculation (for demo purposes)
  const calculateEstimatedProfit = () => {
    if (direction === 'buy') {
      const profitPrice = takeProfitPrice ? parseFloat(takeProfitPrice) : currentPrice.ask * 1.01;
      return ((profitPrice - currentPrice.ask) / currentPrice.ask) * amount;
    } else {
      const profitPrice = takeProfitPrice ? parseFloat(takeProfitPrice) : currentPrice.bid * 0.99;
      return ((currentPrice.bid - profitPrice) / currentPrice.bid) * amount;
    }
  };

  // Calculate estimated loss based on stop loss
  const calculateEstimatedLoss = () => {
    if (!stopLossPrice) return 0;
    
    if (direction === 'buy') {
      const lossPrice = parseFloat(stopLossPrice);
      return ((lossPrice - currentPrice.ask) / currentPrice.ask) * amount;
    } else {
      const lossPrice = parseFloat(stopLossPrice);
      return ((currentPrice.bid - lossPrice) / currentPrice.bid) * amount;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with the trading API to place the actual order
    console.log('Placing order:', {
      symbol,
      orderType,
      direction,
      amount,
      limitPrice: limitPrice || null,
      takeProfitPrice: takeProfitPrice || null,
      stopLossPrice: stopLossPrice || null,
    });
    
    alert(`${direction.toUpperCase()} order placed for ${symbol}`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Place Order</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Symbol and Price */}
        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{symbol}</span>
            <div className="text-right">
              <div className="text-xs text-gray-500 dark:text-gray-400">Current price</div>
              <div className="flex gap-2 text-sm">
                <span className="text-red-600 dark:text-red-400">Bid: {currentPrice.bid.toFixed(5)}</span>
                <span className="text-green-600 dark:text-green-400">Ask: {currentPrice.ask.toFixed(5)}</span>
              </div>
            </div>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Spread: {((currentPrice.ask - currentPrice.bid) / currentPrice.bid * 10000).toFixed(1)} pips
          </div>
        </div>

        {/* Order Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Order Type
          </label>
          <div className="flex rounded-md shadow-sm">
            <button
              type="button"
              className={`flex-1 py-2 px-3 text-sm font-medium rounded-l-md focus:z-10 focus:outline-none ${
                orderType === 'market'
                  ? 'bg-blue-600 text-white dark:bg-blue-700'
                  : 'bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
              }`}
              onClick={() => setOrderType('market')}
            >
              Market
            </button>
            <button
              type="button"
              className={`flex-1 py-2 px-3 text-sm font-medium rounded-r-md focus:z-10 focus:outline-none ${
                orderType === 'limit'
                  ? 'bg-blue-600 text-white dark:bg-blue-700'
                  : 'bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-300 border border-l-0 border-gray-300 dark:border-gray-600'
              }`}
              onClick={() => setOrderType('limit')}
            >
              Limit
            </button>
          </div>
        </div>

        {/* Direction */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Direction
          </label>
          <div className="flex rounded-md shadow-sm">
            <button
              type="button"
              className={`flex-1 py-2 px-3 text-sm font-medium rounded-l-md focus:z-10 focus:outline-none ${
                direction === 'buy'
                  ? 'bg-green-600 text-white dark:bg-green-700'
                  : 'bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
              }`}
              onClick={() => setDirection('buy')}
            >
              Buy
            </button>
            <button
              type="button"
              className={`flex-1 py-2 px-3 text-sm font-medium rounded-r-md focus:z-10 focus:outline-none ${
                direction === 'sell'
                  ? 'bg-red-600 text-white dark:bg-red-700'
                  : 'bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-300 border border-l-0 border-gray-300 dark:border-gray-600'
              }`}
              onClick={() => setDirection('sell')}
            >
              Sell
            </button>
          </div>
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Amount ({currency || 'USD'})
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 dark:text-gray-400 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              className="block w-full pl-7 pr-12 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent sm:text-sm"
              placeholder="0.00"
              min="1"
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
                type="button"
                onClick={() => balance && setAmount(balance / 10)}
                className="h-full px-2 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 focus:outline-none"
              >
                10%
              </button>
              <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
              <button
                type="button"
                onClick={() => balance && setAmount(balance / 2)}
                className="h-full px-2 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 focus:outline-none"
              >
                50%
              </button>
              <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
              <button
                type="button"
                onClick={() => balance && setAmount(balance * 0.95)}
                className="h-full px-2 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 focus:outline-none"
              >
                Max
              </button>
            </div>
          </div>
        </div>

        {/* Limit Price (only for limit orders) */}
        {orderType === 'limit' && (
          <div className="mb-4">
            <label htmlFor="limitPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Limit Price
            </label>
            <input
              type="text"
              id="limitPrice"
              value={limitPrice}
              onChange={(e) => setLimitPrice(e.target.value)}
              className="block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent sm:text-sm"
              placeholder={direction === 'buy' ? currentPrice.ask.toFixed(5) : currentPrice.bid.toFixed(5)}
            />
          </div>
        )}

        {/* Advanced settings (collapsible) */}
        <details className="mb-4">
          <summary className="text-sm font-medium text-blue-600 dark:text-blue-400 cursor-pointer">
            Risk Management
          </summary>
          
          <div className="mt-3 space-y-3">
            <div>
              <label htmlFor="takeProfitPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Take Profit Price
              </label>
              <input
                type="text"
                id="takeProfitPrice"
                value={takeProfitPrice}
                onChange={(e) => setTakeProfitPrice(e.target.value)}
                className="block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent sm:text-sm"
                placeholder={direction === 'buy' 
                  ? (currentPrice.ask * 1.01).toFixed(5) 
                  : (currentPrice.bid * 0.99).toFixed(5)
                }
              />
            </div>
            
            <div>
              <label htmlFor="stopLossPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Stop Loss Price
              </label>
              <input
                type="text"
                id="stopLossPrice"
                value={stopLossPrice}
                onChange={(e) => setStopLossPrice(e.target.value)}
                className="block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent sm:text-sm"
                placeholder={direction === 'buy' 
                  ? (currentPrice.ask * 0.99).toFixed(5) 
                  : (currentPrice.bid * 1.01).toFixed(5)
                }
              />
            </div>
          </div>
        </details>

        {/* Order summary */}
        <div className="mb-6 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Order Summary</h4>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Type:</span>
              <span className="font-medium text-gray-900 dark:text-white">{orderType.charAt(0).toUpperCase() + orderType.slice(1)} {direction.toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Price:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {orderType === 'market' 
                  ? (direction === 'buy' ? currentPrice.ask.toFixed(5) : currentPrice.bid.toFixed(5))
                  : limitPrice || '-'
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Amount:</span>
              <span className="font-medium text-gray-900 dark:text-white">${amount.toFixed(2)}</span>
            </div>
            {(takeProfitPrice || stopLossPrice) && (
              <>
                {takeProfitPrice && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Est. Profit:</span>
                    <span className="font-medium text-green-600 dark:text-green-400">
                      +${Math.abs(calculateEstimatedProfit()).toFixed(2)}
                    </span>
                  </div>
                )}
                {stopLossPrice && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Max Loss:</span>
                    <span className="font-medium text-red-600 dark:text-red-400">
                      -${Math.abs(calculateEstimatedLoss()).toFixed(2)}
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className={`w-full py-3 px-4 text-white font-medium rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            direction === 'buy'
              ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500 dark:bg-green-700 dark:hover:bg-green-800'
              : 'bg-red-600 hover:bg-red-700 focus:ring-red-500 dark:bg-red-700 dark:hover:bg-red-800'
          }`}
        >
          {direction === 'buy' ? 'Buy' : 'Sell'} {symbol}
        </button>
      </form>
    </div>
  );
};

export default OrderForm;