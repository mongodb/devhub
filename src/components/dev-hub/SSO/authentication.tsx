import React, { createContext, useState } from 'react';
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
    return (
        <Provider value={{ authClient, user, setUser }}>{children}</Provider>
    );
};

export { AuthenticationProvider, AuthenticationContext };
