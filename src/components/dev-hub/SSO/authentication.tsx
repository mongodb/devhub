import React, { createContext, useState } from 'react';
import { User } from '~src/interfaces/user';

const AuthenticationContext = createContext({});
const { Provider } = AuthenticationContext;

const AuthenticationProvider = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    return <Provider value={{ user, setUser }}>{children}</Provider>;
};

export { AuthenticationProvider, AuthenticationContext };
