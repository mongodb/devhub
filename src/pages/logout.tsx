import { useContext, useEffect } from 'react';
import { navigate } from 'gatsby';
import { AuthenticationContext } from '~components/dev-hub/SSO';

const Logout = () => {
    const { authClient } = useContext(AuthenticationContext);
    useEffect(() => {
        if (authClient && authClient.isAuthenticated()) {
            // Parse token from redirect url
            authClient.signOut();
        }
        navigate(__PATH_PREFIX__);
    }, [authClient]);
    return null;
};

export default Logout;
