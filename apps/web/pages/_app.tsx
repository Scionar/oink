import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </SWRConfig>
  );
}
