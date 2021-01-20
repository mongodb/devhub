import dlv from 'dlv';
import { removeTrailingSlash } from './src/utils/remove-trailing-slash';

const isNewPage = (prevLocation, newLocation) => {
    const prevPathname = removeTrailingSlash(prevLocation.pathname);
    const newPathname = removeTrailingSlash(newLocation.pathname);
    return prevPathname !== newPathname;
};

export const shouldUpdateScroll = ({ prevRouterProps, routerProps }) => {
    const prevLocation = dlv(prevRouterProps, ['location'], {});
    const newLocation = dlv(routerProps, ['location'], {});
    return isNewPage(prevLocation, newLocation);
};
