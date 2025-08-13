import React, { useRef, useEffect, useState } from 'react';
import { createChart, IChartApi, ColorType, LineStyle } from 'lightweight-charts';

interface TradingChartProps {
  symbol: string;
}

const TradingChart: React.FC<TradingChartProps> = ({ symbol }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartType, setChartType] = useState<'candles' | 'area'>('candles');
  const [timeframe, setTimeframe] = useState<string>('1h');
  const [chartInstance, setChartInstance] = useState<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Dispose previous chart if it exists
    if (chartInstance) {
      chartInstance.remove();
    }

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#9CA3AF',
      },
      grid: {
        vertLines: { color: 'rgba(229, 231, 235, 0.3)' },
        horzLines: { color: 'rgba(229, 231, 235, 0.3)' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        borderColor: '#D1D5DB',
      },
    });

    setChartInstance(chart);

    // Generate sample data
    const candleData = generateCandleData();
    const areaData = candleData.map(candle => ({
      time: candle.time,
      value: candle.close,
    }));

    // Add the appropriate series based on chart type
    if (chartType === 'candles') {
      const candleSeries = chart.addCandlestickSeries({
        upColor: '#10B981',
        downColor: '#EF4444',
        borderUpColor: '#10B981',
        borderDownColor: '#EF4444',
        wickUpColor: '#10B981',
        wickDownColor: '#EF4444',
      });
      candleSeries.setData(candleData);

      // Add volume histogram
      const volumeSeries = chart.addHistogramSeries({
        color: '#9CA3AF',
        priceFormat: {
          type: 'volume',
        },
        priceScaleId: '',
        scaleMargins: {
          top: 0.8,
          bottom: 0,
        },
      });

      const volumeData = candleData.map(candle => ({
        time: candle.time,
        value: candle.volume,
        color: candle.close >= candle.open ? 'rgba(16, 185, 129, 0.5)' : 'rgba(239, 68, 68, 0.5)',
      }));
      
      volumeSeries.setData(volumeData);

      // Add moving averages
      const ma20Series = chart.addLineSeries({
        color: '#60A5FA',
        lineWidth: 1,
        lineStyle: LineStyle.Dashed,
      });

      const ma20Data = calculateMA(areaData, 20);
      ma20Series.setData(ma20Data);
    } else {
      const areaSeries = chart.addAreaSeries({
        topColor: 'rgba(59, 130, 246, 0.4)',
        bottomColor: 'rgba(59, 130, 246, 0.0)',
        lineColor: '#3B82F6',
        lineWidth: 2,
      });
      areaSeries.setData(areaData);
    }

    // Fit chart to data
    chart.timeScale().fitContent();

    // Responsive chart
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [symbol, chartType, timeframe]);

  // Generate sample candlestick data
  const generateCandleData = () => {
    const data = [];
    const numberOfPoints = 100;
    const startPrice = 1.08;
    let currentPrice = startPrice;
    
    const now = new Date();
    const msPerHour = 3600000;
    
    for (let i = 0; i < numberOfPoints; i++) {
      // Random price movement with slight upward bias
      const volatility = 0.0015;
      const changePercent = (Math.random() - 0.48) * volatility;
      
      const open = currentPrice;
      const close = open * (1 + changePercent);
      const high = Math.max(open, close) * (1 + Math.random() * volatility * 0.5);
      const low = Math.min(open, close) * (1 - Math.random() * volatility * 0.5);
      const volume = Math.floor(Math.random() * 1000) + 500;
      
      currentPrice = close;
      
      data.push({
        time: Math.floor((now.getTime() - (numberOfPoints - i) * msPerHour) / 1000),
        open,
        high,
        low,
        close,
        volume,
      });
    }
    
    return data;
  };

  // Calculate moving average
  const calculateMA = (data: any[], period: number) => {
    const result = [];
    
    for (let i = period - 1; i < data.length; i++) {
      const sum = data
        .slice(i - period + 1, i + 1)
        .reduce((total, value) => total + value.value, 0);
      
      result.push({
        time: data[i].time,
        value: sum / period,
      });
    }
    
    return result;
  };

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-3 gap-3">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white">{symbol}</h3>
        
        <div className="flex space-x-2">
          {/* Timeframe selector */}
          <div className="inline-flex rounded-lg border border-gray-300 dark:border-gray-600">
            {['15m', '1h', '4h', '1d'].map(tf => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 text-xs font-medium ${
                  timeframe === tf
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300'
                    : 'bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
          
          {/* Chart type selector */}
          <div className="inline-flex rounded-lg border border-gray-300 dark:border-gray-600">
            <button
              onClick={() => setChartType('candles')}
              className={`px-3 py-1 text-xs font-medium ${
                chartType === 'candles'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300'
                  : 'bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Candlestick
            </button>
            <button
              onClick={() => setChartType('area')}
              className={`px-3 py-1 text-xs font-medium ${
                chartType === 'area'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300'
                  : 'bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Line
            </button>
          </div>
        </div>
      </div>
      
      <div ref={chartContainerRef} className="w-full h-[400px]" />
    </div>
  );
};

export default TradingChart;