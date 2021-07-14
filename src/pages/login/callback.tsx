import React, { useContext, useEffect } from 'react';
import Layout from '~components/dev-hub/layout';
import { AuthenticationContext } from '~components/dev-hub/SSO';
const ActualCallback = () => {
    // console.log(location);

    return <div />;
};

const Callback = ({ location }) => {
    const { authClient, setUser, user } = useContext(AuthenticationContext);
    console.log(authClient, setUser);
    useEffect(() => {
        if (authClient && authClient.isLoginRedirect()) {
            // Parse token from redirect url
            authClient.token.parseFromUrl().then(data => {
                const { idToken } = data.tokens;
                console.log(`Hi ${idToken.claims.email}!`);
                setUser({
                    email: idToken.claims.email,
                    firstName: idToken.claims.firstName,
                    lastName: idToken.claims.lastName,
                });
                // Store parsed token in Token Manager
                authClient.tokenManager.add('idToken', idToken);
                console.log(idToken);
            });
        } else if (authClient) {
            // Attempt to retrieve ID Token from Token Manager
            authClient.tokenManager.get('idToken').then(idToken => {
                console.log('in manager', idToken);
                if (idToken) {
                    console.log(`Hi ${idToken.claims.email}!`);
                    setUser({
                        email: idToken.claims.email,
                        firstName: idToken.claims.firstName,
                        lastName: idToken.claims.lastName,
                    });
                } else {
                    // You're not logged in, you need a sessionToken
                    authClient.token.getWithRedirect({
                        responseType: 'id_token',
                    });
                }
            });
        }
    }, [authClient, setUser]);

    console.log(user);
    return <Layout></Layout>;
};

export default Callback;
