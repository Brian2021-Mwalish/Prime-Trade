import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { TrendingUp, Shield, Clock, Bot } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
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

                  <div className="mt-6 p-4 bg-gray-700/50 rounded-lg border border-red-800/30">
                    <h3 className="text-red-400 font-bold text-lg mb-3">Free Premium Bots Available</h3>
                    <div className="text-gray-300 text-sm space-y-2">
                      <div className="flex items-center">
                        <span className="text-red-400 mr-2">▶</span>
                        <span>Advanced Marvel Premium</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-red-400 mr-2">▶</span>
                        <span>THE DOLLAR PATH PRO</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-red-400 mr-2">▶</span>
                        <span>HL BearKing premium BOT</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-red-400 mr-2">▶</span>
                        <span>Super Digit Differ Premium Bot</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-red-400 mr-2">▶</span>
                        <span>HLProtoge Auto Bot</span>
                      </div>
                      <div className="text-center mt-3 text-red-400 font-medium">
                        and many more BOTS!!!
                      </div>
                    </div>
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
              <h2 className="text-4xl font-bold text-red-500 text-center">Experience the Future of AI Trading</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-red-800/50 hover:border-red-600/50 transition-colors">
                  <div className="flex items-center mb-6">
                    <div className="bg-red-600 p-4 rounded-lg mr-4">
                      <TrendingUp size={28} />
                    </div>
                    <h3 className="text-2xl font-semibold">Advanced Market Analytics Tools</h3>
                  </div>
                  <p className="text-gray-300 text-lg">Access real-time market data and use sophisticated, state-of-the-art analytical tools to make informed, precise trading decisions.</p>
                </div>
                
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-red-800/50 hover:border-red-600/50 transition-colors">
                  <div className="flex items-center mb-6">
                    <div className="bg-red-600 p-4 rounded-lg mr-4">
                      <Shield size={28} />
                    </div>
                    <h3 className="text-2xl font-semibold">Secure Trading</h3>
                  </div>
                  <p className="text-gray-300 text-lg">Execute trades with complete confidence through enterprise-grade security infrastructure and advanced encryption protocols that safeguard your account and transactions.</p>
                </div>
                
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-red-800/50 hover:border-red-600/50 transition-colors">
                  <div className="flex items-center mb-6">
                    <div className="bg-red-600 p-4 rounded-lg mr-4">
                      <Clock size={28} />
                    </div>
                    <h3 className="text-2xl font-semibold">24/7 Markets</h3>
                  </div>
                  <p className="text-gray-300 text-lg">Access markets around the clock and trade when it suits you, with real-time updates and notifications.</p>
                </div>
                
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-red-800/50 hover:border-red-600/50 transition-colors">
                  <div className="flex items-center mb-6">
                    <div className="bg-red-600 p-4 rounded-lg mr-4">
                      <Bot size={28} />
                    </div>
                    <h3 className="text-2xl font-semibold">Free Premium Bots</h3>
                  </div>
                  <p className="text-gray-300 text-lg">Access premium trading bots developed by world-class elite traders at no cost and create your own success stories through their automated trading strategies.</p>
                </div>
              </div>

              <div className="mt-auto">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-red-800/50">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-red-500 mb-4">Risk Warning</h3>
                      <div className="text-gray-300 text-lg space-y-4">
                        <p>
                          CFDs are complex instruments and come with a high risk of losing money rapidly due to leverage. 71% of retail investor accounts lose money when trading CFDs with Deriv. You should consider whether you understand how CFDs work and whether you can afford to take the high risk of losing your money.
                        </p>
                        <p>
                          This website is operated by an independent Deriv affiliate. We are not providing financial advice. All trading decisions are your sole responsibility.
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-yellow-400 text-lg font-medium">
                      By "Sign in with Deriv", you acknowledge that you have read and understood this disclaimer.
                    </div>
                  </div>
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