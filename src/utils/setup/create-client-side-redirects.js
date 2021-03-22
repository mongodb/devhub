import dlv from 'dlv';
import { buildTimeClientSideRedirects } from '../../queries/client-side-redirects';

// These alone are not enough to fully redirect, we should also
// be updating Fastly for a 301 response
export const createClientSideRedirects = async (graphql, createRedirect) => {
    const resp = await graphql(buildTimeClientSideRedirects);
    const result = dlv(resp, 'data.allStrapiClientSideRedirects.nodes', []);
    result.forEach(redirect =>
        createRedirect({ ...redirect, redirectInBrowser: true })
    );
};
