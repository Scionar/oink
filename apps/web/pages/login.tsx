import { useAuth0 } from '@auth0/auth0-react';
import {
  Accordion,
  AppTitle,
  Article,
  Autocomplete,
  Backdrop,
  Button,
  Chart,
  DateInput,
  IconTrash,
  Input,
  Modal,
  Panel,
  Snout,
  Spacer,
} from 'ui';

export default function LoginPage() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const loginOnClickHandler = () => {
    return loginWithRedirect();
  };

  return (
    <Article>
      <Spacer>
        <Snout style={{ alignSelf: 'center' }} />
        <AppTitle />
        <Panel>
          <Spacer variant="article">
            <p style={{ textAlign: 'center' }}>
              Introducing the revolutionary new app for those looking to gain
              weight and avoid the pesky gym: Anti-Fitness!
            </p>

            <p style={{ textAlign: 'center' }}>
              Are you tired of feeling guilty for skipping the gym or not
              adhering to a strict workout routine? Look no further, because
              with Anti-Fitness, you can finally embrace your inner couch potato
              and achieve your desired weight gain without ever breaking a
              sweat.
            </p>
          </Spacer>
        </Panel>

        <Button variant="positive" onClick={loginOnClickHandler}>
          Login
        </Button>
      </Spacer>
    </Article>
  );
}
