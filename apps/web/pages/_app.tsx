import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { Auth0Provider } from "@auth0/auth0-react";
import { TokenProvider } from "../providers/TokenProvider";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_ISSUER_URL as string}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID as string}
      authorizationParams={{
        redirect_uri: process.env.NEXT_PUBLIC_AUTH0_RETURN_URL as string,
        scope: "openid profile",
        audience: "oink-api",
      }}
      cacheLocation="localstorage"
    >
      <TokenProvider>
        <Component {...pageProps} />
      </TokenProvider>
    </Auth0Provider>
  );
}
