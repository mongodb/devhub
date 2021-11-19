import { useContext, useEffect, useMemo } from 'react';
import { navigate } from 'gatsby';
import { AuthenticationContext } from '~components/dev-hub/SSO';
import { parseQueryString } from '~utils/query-string';

const Callback = ({ location }) => {
    const { search } = location;
    const { authClient, onToken } = useContext(AuthenticationContext);
    const parsedSearchParam = useMemo(
        () =>
            search
                ? parseQueryString(search)['return_to']
                : __PATH_PREFIX__ || '/',
        [search]
    );
    useEffect(() => {
        const handleLoginRedirect = async () => {
            // If we are redirected here with a `code` from Okta, we have the claims needed to properly identify the user
            // This function is called if and only if this code exists
            authClient.token.parseFromUrl().then(({ tokens }) => {
                const { idToken } = tokens;
                if (idToken) {
                    // Store parsed token in Token Manager for later re-use
                    authClient.tokenManager.add('idToken', idToken);
                    onToken(idToken);
                    // Redirect the user back to an originalUri, or where they wanted to go
                    // This is not defined if the token in token manager is valid since we didn't have to
                    // re-invoke the OIDC flow
                    if (authClient.getOriginalUri()) {
                        authClient.handleLoginRedirect({ idToken });
                    } else {
                        // If a token already exists, we can just use the returned_to query param
                        navigate(parsedSearchParam);
                    }
                }
            });
        };
        const fetchFromTokenManager = async () => {
            const token = await authClient.tokenManager.get('idToken');
            return token;
        };
        const ensureOktaApplicationSession = async () => {
            return authClient.token
                .getWithoutPrompt({
                    responseType: 'id_token',
                    scopes: ['openid', 'email', 'profile'],
                })
                .then(res => {
                    authClient.tokenManager.setTokens(res?.tokens);
                    onToken(res?.tokens?.idToken);
                    navigate(parsedSearchParam);
                });
            // TODO: Add reject logic here - how should we handle a failure to retrieve idp session?
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
                    ensureOktaApplicationSession();
                }
            }
        }
        handleSignIn();
    }, [authClient, onToken, parsedSearchParam]);
    return null;
};

export default Callback;
