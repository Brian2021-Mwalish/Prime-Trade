import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  Home, 
  BarChart2, 
  Briefcase, 
  ClipboardList, 
  Globe, 
  Menu, 
  X, 
  LogOut,
  Moon,
  Sun,
  Bot
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const DashboardLayout = () => {
  const { user, balance, currency, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const navItems = [
    { path: '/', label: 'Dashboard', icon: <Home size={20} /> },
    { path: '/trading', label: 'Trading', icon: <BarChart2 size={20} /> },
    { path: '/portfolio', label: 'Portfolio', icon: <Briefcase size={20} /> },
    { path: '/transactions', label: 'Transactions', icon: <ClipboardList size={20} /> },
    { path: '/markets', label: 'Markets', icon: <Globe size={20} /> },
    { path: '/bot-builder', label: 'Bot Builder', icon: <Bot size={20} /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button 
                onClick={toggleSidebar}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-700 focus:outline-none"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div className="ml-4 flex items-center">
                <img 
                  src="/logo-black.png"
                  alt="Prime Trades Logo" 
                  className="h-8 dark:hidden"
                />
                <img 
                  src="/logo-white.png"
                  alt="Prime Trades Logo" 
                  className="h-8 hidden dark:block"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {balance !== null && (
                <div className="bg-red-50 dark:bg-red-900 rounded-lg px-3 py-1 text-sm">
                  <span className="font-medium text-red-800 dark:text-red-200">
                    {currency} {balance.toFixed(2)}
                  </span>
                </div>
              )}
              <button 
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-700 focus:outline-none"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-1 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar & Main content */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside 
          className={`fixed inset-y-0 left-0 z-50 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-red-900 dark:bg-gray-900 text-white overflow-y-auto`}
        >
          <div className="px-4 pt-20 pb-6 md:pt-6">
            {user && (
              <div className="mb-6 pb-4 border-b border-red-800 dark:border-gray-700">
                <h2 className="text-xl font-semibold">Welcome</h2>
                <p className="text-red-200 dark:text-gray-400 text-sm truncate">{user.email || 'Trader'}</p>
              </div>
            )}
            <nav>
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                          isActive
                            ? 'bg-red-700 dark:bg-gray-700 text-white'
                            : 'text-red-100 dark:text-gray-300 hover:bg-red-800 dark:hover:bg-gray-800'
                        }`
                      }
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main content */}
        <main className="flex-1 bg-gray-50 dark:bg-gray-900 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;