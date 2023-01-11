import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Provider from 'store';
import SocketProvider from 'store/socket';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider>
    <QueryClientProvider client={queryClient}>
      <SocketProvider>
        <GoogleOAuthProvider clientId="476406293259-r5mjumke6mjdu6pitqchajv4rirqdsre.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
      </SocketProvider>
    </QueryClientProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
