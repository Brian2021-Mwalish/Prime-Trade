import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import TradingChart from '../components/TradingChart';
import OrderForm from '../components/OrderForm';
import MarketSelector from '../components/MarketSelector';
import PriceWidget from '../components/PriceWidget';

const Trading = () => {
  const { api } = useAuth();
  const [selectedSymbol, setSelectedSymbol] = useState('EUR/USD');
  const [marketData, setMarketData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPrice, setCurrentPrice] = useState<{ bid: number; ask: number }>({ bid: 0, ask: 0 });
  const priceStreamRef = useRef<any>(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      if (!api) return;

      try {
        // Get active symbols
        const response = await api.market().activeSymbols();
        if (response.active_symbols) {
          setMarketData(response.active_symbols);
        }
      } catch (error) {
        console.error('Error fetching active symbols:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarketData();

    return () => {
      // Clean up price stream on unmount
      if (priceStreamRef.current) {
        priceStreamRef.current.unsubscribe();
      }
    };
  }, [api]);

  useEffect(() => {
    const subscribeToPrice = async () => {
      if (!api || !selectedSymbol) return;

      // Clean up previous subscription
      if (priceStreamRef.current) {
        await priceStreamRef.current.unsubscribe();
      }

      const symbolCode = marketData.find(s => s.display_name === selectedSymbol)?.symbol;
      if (!symbolCode) return;

      try {
        // Subscribe to price updates
        priceStreamRef.current = await api.market().subscribeTicks({ ticks: symbolCode });
        
        priceStreamRef.current.onUpdate(({ tick }: any) => {
          if (tick) {
            // Simulate bid/ask spread
            const price = parseFloat(tick.quote);
            const spread = price * 0.0002; // 0.02% spread
            
            setCurrentPrice({
              bid: price - spread / 2,
              ask: price + spread / 2,
            });
          }
        });
      } catch (error) {
        console.error('Error subscribing to price updates:', error);
      }
    };

    subscribeToPrice();
  }, [api, selectedSymbol, marketData]);

  const handleSymbolChange = (symbol: string) => {
    setSelectedSymbol(symbol);
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Trading</h1>
        <p className="text-gray-600 dark:text-gray-400">Trade forex, commodities, and indices</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Market selector and chart */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <MarketSelector 
                markets={marketData}
                selectedSymbol={selectedSymbol}
                onSelectSymbol={handleSymbolChange}
                isLoading={isLoading}
              />
              <PriceWidget currentPrice={currentPrice} />
            </div>
            <TradingChart symbol={selectedSymbol} />
          </div>
        </div>

        {/* Right column - Order form */}
        <div>
          <OrderForm 
            symbol={selectedSymbol} 
            currentPrice={currentPrice}
          />
        </div>
      </div>
    </div>
  );
};

export default Trading;