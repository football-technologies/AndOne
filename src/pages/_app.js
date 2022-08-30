import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import DefaultLayout from "@/layouts";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </ChakraProvider>
  );
}

export default MyApp;
