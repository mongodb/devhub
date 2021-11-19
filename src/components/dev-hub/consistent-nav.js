import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { UnifiedNav } from '@mdb/consistent-nav';
import { layer } from '~components/dev-hub/theme';
import { getSsoRegistrationLink } from '~utils/get-sso-registration-link';
import { useLocation } from '@reach/router';

export const NAV_DESKTOP_HEIGHT = '88px';
export const NAV_MOBILE_HEIGHT = '55px';

const FrontLayeredNav = styled(UnifiedNav)`
    z-index: ${layer.superFront};
`;

const ConsistentNav = () => {
    const { origin, pathname } = useLocation();
    /**
     * There seems to be some race condition where the return link is not being
     * populated with the correct origin. This tries to delay taking someone
     * to the wrong place until the origin is loaded.
     */
    const returnLink = useMemo(
        () =>
            origin
                ? `${getSsoRegistrationLink(
                      origin
                  )}&return_to=${encodeURIComponent(pathname)}`
                : '#',
        [origin, pathname]
    );
    return (
        <FrontLayeredNav
            floraTheme="default"
            position="sticky"
            property="DEVHUB"
            signInUrl={returnLink}
        />
    );
};

export default ConsistentNav;
