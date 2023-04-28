import Head from "next/head";
import { Article, Button, Input, Panel, Snout, Spacer } from "ui";
import { ChangeEvent, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [emailValue, setEmailValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");

  const emailOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.currentTarget.value);
  };

  const passwordOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.currentTarget.value);
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <Head>
        <title>Oink Authentication</title>
      </Head>
      <Article>
        <Spacer>
          <form onSubmit={onSubmitHandler}>
            <Spacer variant="form">
              <Snout style={{ alignSelf: "center" }} />

              <Spacer variant="article">
                <Input
                  label="Email"
                  value={emailValue}
                  name="email"
                  required
                  onChange={emailOnChangeHandler}
                />

                <Input
                  label="Password"
                  value={passwordValue}
                  name="password"
                  type="password"
                  required
                  onChange={passwordOnChangeHandler}
                />

                <Button variant="positive">Login</Button>
              </Spacer>
            </Spacer>
          </form>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <p>Don't have an account yet?</p>

            <p>
              <Link
                href="/sign-up"
                style={{
                  textAlign: "right",
                }}
              >
                Sign up
              </Link>
            </p>
          </div>
        </Spacer>
      </Article>
    </>
  );
}
