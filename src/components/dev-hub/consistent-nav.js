import React from 'react';
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
    const returnLink = `${getSsoRegistrationLink(
        origin
    )}&return_to=${encodeURIComponent(pathname)}`;
    return (
        <FrontLayeredNav
            position="sticky"
            property="DEVHUB"
            signInUrl={returnLink}
        />
    );
};

export default ConsistentNav;
