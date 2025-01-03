import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./utils/theme.ts";
import { ColorModeScript } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { persister, store } from "./app/store.ts";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <App />
          </ChakraProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </>
);
