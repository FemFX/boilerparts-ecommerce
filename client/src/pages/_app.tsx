import { persistor, store } from "@/store";
import { useEffect } from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useTheme } from "@/hooks/useTheme";
import NextNProgress from "nextjs-progressbar";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  // const { theme } = useTheme();

  // useEffect(() => {
  //   const body = document.querySelector("body");
  //   if (theme === "dark") {
  //     body?.classList.add("dark");
  //   } else {
  //     body?.classList.remove("dark");
  //   }
  // }, [theme]);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <NextNProgress />
          <Component {...pageProps} />
          <ToastContainer
            position="bottom-right"
            hideProgressBar={false}
            closeOnClick
            rtl={false}
            limit={1}
            theme="light"
          />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
