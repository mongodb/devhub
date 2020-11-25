import { removeTrailingSlash } from './src/utils/remove-trailing-slash';

export const shouldUpdateScroll = ({ prevRouterProps, routerProps }) => {
    const prevLocation =
        prevRouterProps &&
        removeTrailingSlash(prevRouterProps.location.pathname);
    const newLocation =
        routerProps && removeTrailingSlash(routerProps.location.pathname);
    return prevLocation !== newLocation;
};
