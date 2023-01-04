import "../styles/globals.css";
import React, { useState } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/chakraTheme";
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { Session } from "next-auth";

import NavbarFooterLayout from "../components/Layouts/NavbarFooterLayout";
import { LoggedUserMentorProfileProvider } from "../providers/UserSessionProvider";
import { SessionProvider } from "next-auth/react";

interface TypedPageProps {
  dehydratedState: DehydratedState;
  session: Session;
}

interface TypedAppProps extends AppProps<TypedPageProps> {
  pageProps: TypedPageProps;
}

function MyApp({ Component, pageProps }: TypedAppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const { dehydratedState, session } = pageProps;

  return (
    <>
      <Head>
        <title>Mentorías</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydratedState}>
          <SessionProvider session={session}>
            <LoggedUserMentorProfileProvider>
              <ChakraProvider theme={theme}>
                <NavbarFooterLayout>
                  <Component {...pageProps} />
                </NavbarFooterLayout>
              </ChakraProvider>
            </LoggedUserMentorProfileProvider>
          </SessionProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
