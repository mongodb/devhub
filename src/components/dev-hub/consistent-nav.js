import React from 'react';
import styled from '@emotion/styled';
import { UnifiedNav } from '@mdb/consistent-nav';
import { layer } from '~components/dev-hub/theme';

export const NAV_DESKTOP_HEIGHT = '88px';
export const NAV_MOBILE_HEIGHT = '55px';

const FrontLayeredNav = styled(UnifiedNav)`
    z-index: ${layer.superFront};
`;

const ConsistentNav = () => (
    <FrontLayeredNav position="sticky" property="DEVHUB" floraTheme="default" />
);

export default ConsistentNav;
