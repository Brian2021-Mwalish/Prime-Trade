export const config = {
  appId: import.meta.env.VITE_DERIV_APP_ID || '76014',
  oauthRedirectUrl: import.meta.env.VITE_OAUTH_REDIRECT_URL || 'https://www.primetrades.app',
  apiUrl: 'https://api.deriv.com',
  websocketUrl: 'wss://ws.binaryws.com/websockets/v3',
};