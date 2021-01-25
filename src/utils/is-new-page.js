import { removeTrailingSlash } from './remove-trailing-slash';

export const isNewPage = (prevLocation, newLocation) => {
    const prevPathname = removeTrailingSlash(prevLocation.pathname);
    const newPathname = removeTrailingSlash(newLocation.pathname);
    return prevPathname !== newPathname;
};
