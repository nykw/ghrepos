import "../styles/globals.css";
import type {AppProps} from "next/app";
import {configureStore} from "@reduxjs/toolkit";
import {cookieSlice} from "../features/cookie";
import {Provider} from "react-redux";
import AuthProvider from "../components/molecules/AuthProvider";

const store = configureStore({reducer: cookieSlice.reducer});

// eslint-disable-next-line require-jsdoc
function MyApp({Component, pageProps}: AppProps) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
