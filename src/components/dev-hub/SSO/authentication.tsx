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
    'https://account-qa.mongodb.com/account/login?fromURI=https%3A%2F%2Fdevhub-local.mongodb.com%3A8000%2Flogin%2Fcallback';

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
                      redirectUri:
                          window.location.origin +
                          __PATH_PREFIX__ +
                          '/login/callback',
                  })
                : null,
        []
    );
    const [user, setUser] = useState<User | object>({});
    console.log(user);
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
    const onToken = useCallback(idToken => {
        if (idToken) {
            const claims = idToken.claims || {};
            const { email, name } = claims;
            setUser({
                email,
                name,
            });
            setIsSignedIn(true);
        }
    }, []);
    useEffect(() => {
        if (!isSignedIn && authClient) {
            // Attempt to retrieve ID Token from Token Manager
            authClient.tokenManager.get('idToken').then(onToken);
            // Otherwise, try to hit the endpoint if they are auth'd
            const ensureOktaApplicationSession = async () => {
                return authClient.token
                    .getWithoutPrompt({
                        responseType: 'id_token',
                        scopes: ['openid', 'email', 'profile'],
                    })
                    .then(res => {
                        authClient.tokenManager.setTokens(res?.tokens);
                    });
            };
            authClient.session.exists().then(resp => {
                if (resp) {
                    ensureOktaApplicationSession();
                }
            });
        }
    }, [authClient, isSignedIn, onToken]);
    return (
        <Provider value={{ authClient, isSignedIn, onToken, user, setUser }}>
            {children}
        </Provider>
    );
};

export { AuthenticationProvider, AuthenticationContext };
