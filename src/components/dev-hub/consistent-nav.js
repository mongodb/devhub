import React from 'react';
import styled from '@emotion/styled';
import { UnifiedNav } from '@mdb/consistent-nav';
import { layer } from '~components/dev-hub/theme';
import { REGISTER_LINK } from './SSO';

export const NAV_DESKTOP_HEIGHT = '88px';
export const NAV_MOBILE_HEIGHT = '55px';

const FrontLayeredNav = styled(UnifiedNav)`
    z-index: ${layer.superFront};
`;

const ConsistentNav = () => (
    <FrontLayeredNav
        position="sticky"
        property="DEVHUB"
        signInUrl={REGISTER_LINK}
    />
);

export default ConsistentNav;
