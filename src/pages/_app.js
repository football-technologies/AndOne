import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "@/store";

import { ChakraProvider, color } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
const colors = {
  primary: "#EA4D72",
  secondary: "#842D57",
  teritiary: "#FFC107",
  link: "#436BF8",
  hover: "#FF9900",
  black: "#333",
  darkGray: "#777777",
  lightGray: "#CCCCCC",
  paleGray: "#EEEEEE",
  white: "#fff",
};
const theme = extendTheme({
  colors,
  // components: {
  // Button: {
  //   variants: {
  //     big: {
  //       bg: colors.primary,
  //       color: colors.white,
  //       borderStyle: "solid",
  //       borderWidth: "2px",
  //       rounded: "full",
  //       px: 10,
  //       py: 5,
  //       letterSpacing: "0.1em",
  //     },
  //   },
  // },
  // },
});

import DefaultLayout from "@/layouts";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
