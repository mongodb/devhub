import React, { createContext, useCallback, useEffect, useState } from 'react';
import { User } from '~src/interfaces/user';
import { OktaAuth } from '@okta/okta-auth-js';

const authClient = new OktaAuth({
    issuer: process.env.OKTA_URL,
    clientId: process.env.OKTA_CLIENT_ID,
    redirectUri: window.location.origin + '/login/callback',
});
const AuthenticationContext = createContext<{
    authClient: any;
    isSignedIn: boolean;
    setUser: (x: any) => void;
    user: any;
}>({ authClient, isSignedIn: false, setUser: () => null, user: null });
const { Provider } = AuthenticationContext;

const AuthenticationProvider = ({ children }) => {
    const [user, setUser] = useState<User | object>({});
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
    const parseClaimsFromToken = useCallback(idToken => {
        if (idToken) {
            const claims = idToken.claims || {};
            const { email, firstName, lastName } = claims;
            console.log(`Hi ${idToken.claims.email}!`);
            setUser({
                email,
                firstName,
                lastName,
            });
            setIsSignedIn(true);
        }
    }, []);
    useEffect(() => {
        if (authClient) {
            // Attempt to retrieve ID Token from Token Manager
            authClient.tokenManager.get('idToken').then(parseClaimsFromToken);
        }
    }, [parseClaimsFromToken]);
    return (
        <Provider value={{ authClient, isSignedIn, user, setUser }}>
            {children}
        </Provider>
    );
};

export { AuthenticationProvider, AuthenticationContext };
