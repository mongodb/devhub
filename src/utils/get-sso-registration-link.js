export const getSsoRegistrationLink = origin =>
    `${process.env.ACCOUNT_PAGE_URL}/account/login?fromURI=${encodeURIComponent(
        origin + __PATH_PREFIX__
    )}%2Flogin%2Fcallback`;
