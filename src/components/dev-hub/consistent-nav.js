import React from 'react';
import styled from '@emotion/styled';
import { UnifiedNav } from '@mdb/consistent-nav';
import { layer, fontSize } from '~components/dev-hub/theme';

export const NAV_DESKTOP_HEIGHT = '88px';
export const NAV_MOBILE_HEIGHT = '55px';

const FrontLayeredNav = styled(UnifiedNav)`
    z-index: ${layer.superFront};
    /* The logo relies on consistent font-size, which is to be 16px */
    /* The value we pull in from the nav computes to 18px (which is our default) */
    div:first-of-type > a {
        font-size: ${fontSize.small};
    }
`;

const ConsistentNav = () => (
    <FrontLayeredNav position="sticky" property="DEVHUB" />
);

export default ConsistentNav;
