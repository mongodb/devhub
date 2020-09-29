exports.shouldUpdateScroll = ({ prevRouterProps, routerProps }) => {
    const prevLocation = prevRouterProps && prevRouterProps.location.pathname;
    const newLocation = routerProps && routerProps.location.pathname;
    return prevLocation !== newLocation;
};
