import React, {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import dlv from 'dlv';
import { User } from '~src/interfaces/user';
import { identifyAuid } from '~utils/identify-auid';
import { isBrowser } from '~utils/is-browser';
import { OktaAuth } from '@okta/okta-auth-js';

export const REGISTER_LINK =
    'https://account-qa.mongodb.com/account/login?fromURI=https%3A%2F%2Fdevhub-local.mongodb.com%3A8000%2Flogin%2Fcallback';

const fetchAuid = async () => {
    return fetch(`${process.env.ACCOUNT_PAGE_URL}/account/profile/userAuid`, {
        credentials: 'include',
        method: 'GET',
    }).then(r => r.json());
};

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
    const onToken = useCallback(async idToken => {
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
    useEffect(() => {
        const getAuid = async () => {
            if (user && !user.auid) {
                const auidResponse = await fetchAuid();
                const auid = dlv(auidResponse, 'userAuid', null);
                if (auid) {
                    setUser({ ...user, auid });
                    identifyAuid(auid);
                }
            }
        };
        getAuid();
    }, [user]);
    return (
        <Provider value={{ authClient, isSignedIn, onToken, user, setUser }}>
            {children}
        </Provider>
    );
};

export { AuthenticationProvider, AuthenticationContext };
