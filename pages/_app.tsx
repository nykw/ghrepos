import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { configureStore } from '@reduxjs/toolkit';
import { cookieSlice } from '../features/cookie';
import { Provider } from 'react-redux';

const store = configureStore({ reducer: cookieSlice.reducer });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
