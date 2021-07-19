import React, { useContext, useEffect } from 'react';
import Layout from '~components/dev-hub/layout';
import { AuthenticationContext } from '~components/dev-hub/SSO';

const Callback = () => {
    const { authClient, onToken } = useContext(AuthenticationContext);
    useEffect(() => {
        if (authClient && authClient.isLoginRedirect()) {
            // Parse token from redirect url
            authClient.token.parseFromUrl().then(({ tokens }) => {
                const { idToken } = tokens;
                onToken(idToken);
                if (idToken) {
                    // Store parsed token in Token Manager
                    authClient.tokenManager.add('idToken', idToken);
                }
            });
        } else if (authClient) {
            // Attempt to retrieve ID Token from Token Manager
            authClient.tokenManager.get('idToken').then(onToken);
        }
    }, [authClient, onToken]);

    return <Layout />;
};

export default Callback;
