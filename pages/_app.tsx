import React, { useState } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/chakraTheme";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

import NavbarFooterLayout from "../components/Layouts/NavbarFooterLayout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Head>
        <title>Mentorías</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <SessionProvider session={pageProps.session}>
            <ChakraProvider theme={theme}>
              <NavbarFooterLayout>
                <Component {...pageProps} />
              </NavbarFooterLayout>
            </ChakraProvider>
          </SessionProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
