import { useContext, useEffect, useMemo } from 'react';
import { navigate } from 'gatsby';
import { AuthenticationContext } from '~components/dev-hub/SSO';
import { parseQueryString } from '~utils/query-string';

const Callback = ({ location }) => {
    const { search } = location;
    const { authClient, onToken } = useContext(AuthenticationContext);
    const parsedSearchParam = useMemo(
        () => (search ? parseQueryString(search)['return_to'] : null),
        [search]
    );
    useEffect(() => {
        if (authClient && authClient.isLoginRedirect()) {
            // Parse token from redirect url
            authClient.token.parseFromUrl().then(({ tokens }) => {
                const { idToken } = tokens;
                if (idToken) {
                    // Store parsed token in Token Manager
                    authClient.tokenManager.add('idToken', idToken);
                    onToken(idToken);
                    // Redirect the user back to an originalUri
                    if (authClient.getOriginalUri()) {
                        authClient.handleLoginRedirect({ idToken });
                    } else if (parsedSearchParam) {
                        navigate(parsedSearchParam);
                    }
                }
            });
        } else if (authClient) {
            // Attempt to retrieve ID Token from Token Manager
            authClient.tokenManager
                .get('idToken')
                .then(token =>
                    token ? token : authClient.signInWithRedirect()
                )
                .then(onToken)
                .then(() => parsedSearchParam && navigate(parsedSearchParam));
        }
    }, [authClient, onToken, parsedSearchParam]);
    // TODO: Build out login page UX, redirect
    return null;
};

export default Callback;
