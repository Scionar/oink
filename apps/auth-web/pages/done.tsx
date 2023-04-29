import Head from "next/head";
import { Article, BigEmoji, Panel, Spacer, StandaloneLink } from "ui";
import Link from "next/link";

export default function Done() {
  return (
    <>
      <Head>
        <title>Oink Authentication</title>
      </Head>
      <Article>
        <Spacer>
          <BigEmoji style={{ alignSelf: "center" }}>🎉</BigEmoji>
          <Panel>
            <Spacer variant="article">
              <h1>Congratulations!</h1>
              <p>
                You are now registered. Now you can go to back and login for the
                first time.
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Link
                  href="/"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <StandaloneLink variant="back">
                    Go back to Login
                  </StandaloneLink>
                </Link>
              </div>
            </Spacer>
          </Panel>
        </Spacer>
      </Article>
    </>
  );
}
