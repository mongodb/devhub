import React, {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { navigate } from 'gatsby';
import { OktaAuth } from '@okta/okta-auth-js';
import { User } from '~src/interfaces/user';
import { isBrowser } from '~utils/is-browser';

const AuthenticationContext = createContext<{
    authClient: any;
    isSignedIn: boolean;
    onLogout: () => void;
    onToken: (x: string) => void;
    setUser: (x: any) => void;
    user: any;
}>({
    authClient: null,
    isSignedIn: false,
    onLogout: () => null,
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
            navigate('/');
        }
    }, []);
    const onLogout = useCallback(() => {
        if (authClient) {
            authClient.signOut();
        }
    }, [authClient]);
    useEffect(() => {
        if (authClient) {
            // Attempt to retrieve ID Token from Token Manager
            authClient.tokenManager.get('idToken').then(onToken);
        }
    }, [authClient, onToken]);
    return (
        <Provider
            value={{ authClient, isSignedIn, onLogout, onToken, user, setUser }}
        >
            {children}
        </Provider>
    );
};

export { AuthenticationProvider, AuthenticationContext };
