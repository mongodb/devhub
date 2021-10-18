import { useContext, useEffect, useMemo } from 'react';
import { navigate } from 'gatsby';
import { AuthenticationContext } from '~components/dev-hub/SSO';
import { parseQueryString } from '~utils/query-string';

const Callback = ({ location }) => {
    const { search } = location;
    const { authClient, onToken } = useContext(AuthenticationContext);
    const parsedSearchParam = useMemo(
        () =>
            search ? parseQueryString(search)['return_to'] : __PATH_PREFIX__,
        [search]
    );
    useEffect(() => {
        const handleLoginRedirect = async () => {
            authClient.token.parseFromUrl().then(({ tokens }) => {
                const { idToken } = tokens;
                if (idToken) {
                    // Store parsed token in Token Manager
                    authClient.tokenManager.add('idToken', idToken);
                    onToken(idToken);
                    // Redirect the user back to an originalUri
                    if (authClient.getOriginalUri()) {
                        authClient.handleLoginRedirect({ idToken });
                    } else {
                        navigate(parsedSearchParam);
                    }
                }
            });
        };
        const fetchFromTokenManager = async () => {
            const token = await authClient.tokenManager.get('idToken');
            return token;
        };
        async function handleSignIn() {
            if (authClient && authClient.isLoginRedirect()) {
                // Parse token from redirect url
                handleLoginRedirect();
            } else if (authClient) {
                // Attempt to retrieve ID Token from Token Manager
                const token = await fetchFromTokenManager();
                if (token) {
                    onToken(token);
                    navigate(parsedSearchParam);
                } else {
                    authClient.setOriginalUri(parsedSearchParam);
                    authClient.signInWithRedirect();
                }
            }
        }
        handleSignIn();
    }, [authClient, onToken, parsedSearchParam]);
    // TODO: Build out login page UX, redirect
    return null;
};

export default Callback;
