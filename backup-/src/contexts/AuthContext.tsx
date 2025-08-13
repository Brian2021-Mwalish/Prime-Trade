import React, { createContext, useState, useEffect } from 'react';
import DerivAPI from '@deriv/deriv-api';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { config } from '../config';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null;
  balance: number | null;
  currency: string | null;
  login: () => void;
  logout: () => void;
  api: any;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  balance: null,
  currency: null,
  login: () => {},
  logout: () => {},
  api: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [currency, setCurrency] = useState<string | null>(null);
  const [token, setToken] = useLocalStorage('deriv_token', '');
  const [api, setApi] = useState<any>(null);

  useEffect(() => {
    // Initialize API connection
    const connection = new DerivAPI({ app_id: config.appId });
    setApi(connection);

    // Check for token in URL on callback from OAuth
    const queryParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = queryParams.get('token1');
    
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  useEffect(() => {
    const validateToken = async () => {
      if (!token || !api) {
        setIsLoading(false);
        return;
      }

      try {
        // Set token for API
        await api.authorize(token);
        
        // Get account info
        const response = await api.account().getAccountInfo();
        if (response.error) {
          throw new Error(response.error.message);
        }
        
        setUser(response);
        setIsAuthenticated(true);
        
        // Get balance
        const balanceResponse = await api.account().getBalance();
        if (balanceResponse.balance) {
          setBalance(balanceResponse.balance.balance);
          setCurrency(balanceResponse.balance.currency);
        }
      } catch (error) {
        console.error('Authentication error:', error);
        setToken('');
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();
  }, [token, api]);

  const login = () => {
    const oauthUrl = `https://oauth.deriv.com/oauth2/authorize?app_id=${config.appId}&l=en&redirect_uri=${encodeURIComponent(config.oauthRedirectUrl)}`;
    window.location.href = oauthUrl;
  };

  const logout = () => {
    if (api) {
      api.disconnect();
    }
    setToken('');
    setIsAuthenticated(false);
    setUser(null);
    setBalance(null);
    setCurrency(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        balance,
        currency,
        login,
        logout,
        api,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};