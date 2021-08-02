import React, {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { User } from '~src/interfaces/user';
import { isBrowser } from '~utils/is-browser';
import { OktaAuth } from '@okta/okta-auth-js';

export const REGISTER_LINK =
    'https://account.mongodb.com/account/login?fromURI=https%3A%2F%2Fdeveloper.mongodb.com%2Flogin%2Fcallback';

const AuthenticationContext = createContext<{
    authClient: any;
    isSignedIn: boolean;
    onToken: (x: string) => void;
    setUser: (x: any) => void;
    user: any;
}>({
    authClient: null,
    isSignedIn: false,
    onToken: () => null,
    setUser: () => null,
    user: null,
});

const { Provider } = AuthenticationContext;

const AuthenticationProvider = ({ children }) => {
    const authClient = useMemo(
        () =>
            isBrowser()
                ? new OktaAuth({
                      issuer: process.env.OKTA_URL,
                      clientId: process.env.OKTA_CLIENT_ID,
                      redirectUri: window.location.origin + '/login/callback',
                  })
                : null,
        []
    );
    const [user, setUser] = useState<User | object>({});
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
    const onToken = useCallback(idToken => {
        if (idToken) {
            const claims = idToken.claims || {};
            const { email, firstName, lastName } = claims;
            setUser({
                email,
                firstName,
                lastName,
            });
            setIsSignedIn(true);
        }
    }, []);
    useEffect(() => {
        if (!isSignedIn && authClient) {
            // Attempt to retrieve ID Token from Token Manager
            authClient.tokenManager.get('idToken').then(onToken);
        }
    }, [authClient, isSignedIn, onToken]);
    return (
        <Provider value={{ authClient, isSignedIn, onToken, user, setUser }}>
            {children}
        </Provider>
    );
};

export { AuthenticationProvider, AuthenticationContext };
