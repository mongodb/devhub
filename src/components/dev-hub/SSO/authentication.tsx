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
    setUser: (x: any) => void;
    user: any;
}>({ authClient, setUser: () => null, user: null });
const { Provider } = AuthenticationContext;

const AuthenticationProvider = ({ children }) => {
    const [user, setUser] = useState<User | object>({});
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
        }
    }, []);
    useEffect(() => {
        if (authClient) {
            // Attempt to retrieve ID Token from Token Manager
            authClient.tokenManager.get('idToken').then(parseClaimsFromToken);
        }
    }, [parseClaimsFromToken]);
    return (
        <Provider value={{ authClient, user, setUser }}>{children}</Provider>
    );
};

export { AuthenticationProvider, AuthenticationContext };
