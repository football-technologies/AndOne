import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "@/store";

import { ChakraProvider } from "@chakra-ui/react";
import DefaultLayout from "@/layouts";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
