export const getSsoRegistrationLink = () =>
    `${process.env.ACCOUNT_PAGE_URL}/account/login?fromURI=${encodeURIComponent(
        window.location.origin + __PATH_PREFIX__
    )}%2Flogin%2Fcallback`;
