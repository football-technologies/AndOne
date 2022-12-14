import "@/styles/globals.scss";
import { Provider } from "react-redux";
import store from "@/store";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "@fontsource/noto-sans-jp/400.css";
import "@fontsource/noto-sans-jp/700.css";

const colors = {
  primary: "#EA4D72",
  secondary: "#842D57",
  teritiary: "#FFC107",
  link: "#436BF8",
  hover: "#FF9900",
  input: "#E2E8F0",
  black: "#333",
  darkGray: "#777777",
  lightGray: "#CCCCCC",
  paleGray: "#EEEEEE",
  white: "#fff",
};
const theme = extendTheme({
  colors,
  fonts: {
    heading: `'Noto Sans JP"', sans-serif`,
    body: `'Noto Sans JP"', sans-serif`,
  },
});

import DefaultLayout from "@/layouts";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider theme={theme}>
          <DefaultLayout>
            <Component {...pageProps} />
          </DefaultLayout>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
