import "../styles/globals.css";
import Navbar from "../components/Layout/Navbar";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import Auth from "../components/Login/Auth";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider refetchInterval={5 * 60} session={pageProps.session}>
      <ChakraProvider>
        <Auth>
          <Navbar>
            <Component {...pageProps} />
          </Navbar>
        </Auth>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
