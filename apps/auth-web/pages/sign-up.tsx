import Head from 'next/head';
import {
  Article,
  Button,
  DateInput,
  Input,
  Snout,
  Space,
  Spacer,
  StandaloneLink,
} from 'ui';
import { ChangeEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const [firstNameValue, setFirstNameValue] = useState<string>('');
  const [lastNameValue, setLastNameValue] = useState<string>('');
  const [emailValue, setEmailValue] = useState<string>('');
  const [birthdayValue, setBirthdayValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [passwordConfirmationValue, setPasswordConfirmationValue] =
    useState<string>('');

  const firstNameOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstNameValue(event.currentTarget.value);
  };

  const lastNameOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setLastNameValue(event.currentTarget.value);
  };

  const emailOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.currentTarget.value);
  };

  const birthdayOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setBirthdayValue(event.currentTarget.value);
  };

  const passwordOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.currentTarget.value);
  };

  const passwordConfirmationOnChangeHandler = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setPasswordConfirmationValue(event.currentTarget.value);
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push('/done');
  };

  return (
    <>
      <Head>
        <title>Oink Authentication</title>
      </Head>
      <Article>
        <Spacer>
          <Snout style={{ alignSelf: 'center' }} />
          <div>
            <Link
              href="/"
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <StandaloneLink variant="back">Go back to Login</StandaloneLink>
            </Link>
          </div>
          <form onSubmit={onSubmitHandler}>
            <Spacer variant="form">
              <Spacer variant="article">
                <Input
                  label="First name"
                  value={firstNameValue}
                  name="firstname"
                  required
                  onChange={firstNameOnChangeHandler}
                />

                <Input
                  label="Last name"
                  value={lastNameValue}
                  name="lastname"
                  required
                  onChange={lastNameOnChangeHandler}
                />

                <DateInput
                  label="Birthday"
                  value={birthdayValue}
                  name="birthday"
                  onChange={birthdayOnChangeHandler}
                />

                <Space />

                <Input
                  label="Email"
                  value={emailValue}
                  name="email"
                  required
                  onChange={emailOnChangeHandler}
                />

                <Space />

                <Input
                  label="Password"
                  value={passwordValue}
                  name="password"
                  required
                  type="password"
                  onChange={passwordOnChangeHandler}
                />

                <Input
                  label="Password confirmation"
                  value={passwordConfirmationValue}
                  name="passwordConfirm"
                  required
                  type="password"
                  onChange={passwordConfirmationOnChangeHandler}
                />

                <Space />

                <Button type="submit" variant="creative">
                  Sign up
                </Button>
              </Spacer>
            </Spacer>
          </form>
        </Spacer>
      </Article>
    </>
  );
}
