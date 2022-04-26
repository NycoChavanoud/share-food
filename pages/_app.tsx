import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { CurrentUserContextProvider } from "../contexts/currentUserContext";
import type { NextComponentType } from "next";
import { ToastProvider } from "react-toast-notifications";

type CustomAppProps = AppProps & {
  Component: NextComponentType & { auth?: boolean }; // add auth type
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  return (
    <ToastProvider>
      <SessionProvider session={session}>
        <CurrentUserContextProvider>
          <Component {...pageProps} />
        </CurrentUserContextProvider>
      </SessionProvider>
    </ToastProvider>
  );
}

export default MyApp;
