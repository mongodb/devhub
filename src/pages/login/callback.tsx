import React, { useCallback, useContext, useEffect } from 'react';
import Layout from '~components/dev-hub/layout';
import { AuthenticationContext } from '~components/dev-hub/SSO';

const Callback = () => {
    const { authClient, setUser, user } = useContext(AuthenticationContext);
    console.log(authClient, setUser);
    const parseClaimsFromToken = useCallback(
        idToken => {
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
        },
        [setUser]
    );
    useEffect(() => {
        if (authClient && authClient.isLoginRedirect()) {
            // Parse token from redirect url
            authClient.token.parseFromUrl().then(({ tokens }) => {
                const { idToken } = tokens;
                parseClaimsFromToken(idToken);
                if (idToken) {
                    // Store parsed token in Token Manager
                    authClient.tokenManager.add('idToken', idToken);
                }
            });
        } else if (authClient) {
            // Attempt to retrieve ID Token from Token Manager
            authClient.tokenManager.get('idToken').then(parseClaimsFromToken);
        }
    }, [authClient, parseClaimsFromToken]);

    console.log(user);
    return <Layout />;
};

export default Callback;
