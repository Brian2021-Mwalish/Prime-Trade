import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { TrendingUp, Shield, Clock, Globe } from 'lucide-react';

const Login = () => {
  const { isAuthenticated, isLoading, login } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Login content */}
          <div className="lg:col-span-2 bg-gray-800 rounded-xl shadow-xl p-10 flex flex-col justify-between border border-red-800">
            <div className="space-y-10">
              <div className="text-center">
                <h1 className="text-[3.42rem] font-bold text-red-500 mb-4">Prime Trades App</h1>
                <p className="text-gray-300 text-lg mt-2">Indicating top-tier trading solutions</p>
              </div>

              <div className="space-y-8">
                <p className="text-gray-300 text-[1.15rem]">
                  Access your Prime Trades App account securely using your Deriv credentials.
                </p>

                <button
                  onClick={login}
                  className="w-full py-4 px-6 bg-red-600 hover:bg-red-700 text-white text-lg font-medium rounded-lg shadow transition-colors duration-200 flex items-center justify-center"
                >
                  <span>Sign in with Deriv</span>
                </button>

                <div className="text-gray-400 text-center space-y-4">
                  <div className="text-[1.15rem]">
                    Don't have a token? <a href="https://track.deriv.com/_Zz4Qf5TflgdB4VdSfJsOp2Nd7ZgqdRLk/1/" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300">Create a Demo Account</a>
                  </div>

                  <div className="text-[1.15rem]">
                    Once the account is created, reload Prime Trades App and sign in. The API Scope includes Read, Trade, Payments, and Trading information only.
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-gray-700">
              <p className="text-gray-400 text-center">
                © 2025 Prime Trades App. Powered by Deriv. All rights reserved.
              </p>
            </div>
          </div>

          {/* Features section */}
          <div className="lg:col-span-3 text-white">
            <div className="h-full flex flex-col space-y-12">
              <h2 className="text-4xl font-bold text-red-500 text-center">Experience the Future of Trading</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-red-800/50 hover:border-red-600/50 transition-colors">
                  <div className="flex items-center mb-6">
                    <div className="bg-red-600 p-4 rounded-lg mr-4">
                      <TrendingUp size={28} />
                    </div>
                    <h3 className="text-2xl font-semibold">Advanced Analytics</h3>
                  </div>
                  <p className="text-gray-300 text-lg">Access real-time market data and sophisticated analytical tools to make informed trading decisions.</p>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-red-800/50 hover:border-red-600/50 transition-colors">
                  <div className="flex items-center mb-6">
                    <div className="bg-red-600 p-4 rounded-lg mr-4">
                      <Shield size={28} />
                    </div>
                    <h3 className="text-2xl font-semibold">Secure Trading</h3>
                  </div>
                  <p className="text-gray-300 text-lg">Trade with confidence knowing your account is protected by state-of-the-art security measures.</p>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-red-800/50 hover:border-red-600/50 transition-colors">
                  <div className="flex items-center mb-6">
                    <div className="bg-red-600 p-4 rounded-lg mr-4">
                      <Clock size={28} />
                    </div>
                    <h3 className="text-2xl font-semibold">24/7 Markets</h3>
                  </div>
                  <p className="text-gray-300 text-lg">Access markets around the clock and trade when it suits you, with real-time updates and notifications.</p>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-red-800/50 hover:border-red-600/50 transition-colors">
                  <div className="flex items-center mb-6">
                    <div className="bg-red-600 p-4 rounded-lg mr-4">
                      <Globe size={28} />
                    </div>
                    <h3 className="text-2xl font-semibold">Global Markets</h3>
                  </div>
                  <p className="text-gray-300 text-lg">Trade on a wide range of global markets including forex, commodities, stocks, and cryptocurrencies.</p>
                </div>
              </div>

              <div className="mt-auto">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-red-800/50">
                  <p className="text-2xl font-medium mb-4 text-white">Ready to start trading?</p>
                  <p className="text-gray-300 text-lg">Sign in now to access your portfolio and begin trading on global markets with Prime Trades App.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;