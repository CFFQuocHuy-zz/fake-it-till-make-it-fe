import "../styles/globals.css";
import type {AppProps} from "next/app";
import {useState} from "react";
import Login from "./login";
import {AuthContextProvider} from "./../contexts/AuthContext";

function MyApp({Component, pageProps}: AppProps) {
  const [user, setUser] = useState(false);
  if (!user) {
    return (
      <AuthContextProvider>
        <Login />
      </AuthContextProvider>
    );
  }

  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}

export default MyApp;
