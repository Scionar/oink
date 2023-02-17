import { useAuth0 } from "@auth0/auth0-react";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

type TasksProviderProps = {
  children: React.ReactNode | React.ReactNode[];
};

type ContextValue = string | null;
type SetContextValue = Dispatch<SetStateAction<ContextValue>> | null;

const TokenContext = createContext<ContextValue>(null);
const SetTokenContext = createContext<SetContextValue>(null);

export const TokenProvider = ({ children }: TasksProviderProps) => {
  const [token, setToken] = useState<ContextValue>(null);
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchToken = async () => {
      const fetchedToken = await getAccessTokenSilently();

      setToken(fetchedToken);
    };

    if (isAuthenticated) fetchToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  return (
    <TokenContext.Provider value={token}>
      <SetTokenContext.Provider value={setToken}>
        {children}
      </SetTokenContext.Provider>
    </TokenContext.Provider>
  );
};

export function useToken() {
  return useContext(TokenContext);
}

export function useSetToken() {
  return useContext(TokenContext);
}
