import React, { useRef, useEffect } from 'react';
import { createChart, ColorType } from 'lightweight-charts';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

const MarketOverviewCard: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#9CA3AF',
      },
      grid: {
        vertLines: { color: '#E5E7EB' },
        horzLines: { color: '#E5E7EB' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });

    // Handle theme changes and resize
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    // Generate sample data for the chart
    const data = generateSampleData();

    const areaSeries = chart.addAreaSeries({
      topColor: 'rgba(59, 130, 246, 0.5)',
      bottomColor: 'rgba(59, 130, 246, 0.0)',
      lineColor: 'rgba(59, 130, 246, 1)',
      lineWidth: 2,
    });

    areaSeries.setData(data);

    // Fit the chart to the data
    chart.timeScale().fitContent();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  // Generate sample price data
  const generateSampleData = () => {
    const data = [];
    const numberOfPoints = 100;
    const startPrice = 1.08;
    let currentPrice = startPrice;
    
    const now = new Date();
    const msPerDay = 86400000;
    
    for (let i = 0; i < numberOfPoints; i++) {
      // Random price movement with slight upward bias
      const change = (Math.random() - 0.48) * 0.002;
      currentPrice += change;
      
      data.push({
        time: Math.floor((now.getTime() - (numberOfPoints - i) * msPerDay) / 1000),
        value: currentPrice,
      });
    }
    
    return data;
  };

  const marketMovers = [
    { symbol: 'EUR/USD', price: 1.0842, change: 0.15, direction: 'up' },
    { symbol: 'GBP/JPY', price: 180.425, change: -0.22, direction: 'down' },
    { symbol: 'USD/JPY', price: 142.56, change: 0.35, direction: 'up' },
    { symbol: 'AUD/USD', price: 0.6534, change: -0.08, direction: 'down' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Market Overview</h2>
        <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium flex items-center">
          View all markets <ArrowRight size={16} className="ml-1" />
        </button>
      </div>
      
      <div className="mb-4">
        <div ref={chartContainerRef} className="w-full h-[300px]" />
      </div>
      
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Market Movers</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {marketMovers.map((mover) => (
            <div key={mover.symbol} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-800 dark:text-white">{mover.symbol}</span>
                <div className={`flex items-center ${
                  mover.direction === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {mover.direction === 'up' 
                    ? <TrendingUp size={16} className="mr-1" />
                    : <TrendingDown size={16} className="mr-1" />
                  }
                  {mover.change}%
                </div>
              </div>
              <div className="text-lg font-semibold mt-1 text-gray-900 dark:text-white">{mover.price.toFixed(4)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketOverviewCard;