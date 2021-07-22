import React from 'react';
import styled from '@emotion/styled';
import ImportedNav from '@mdb/consistent-nav';
import { layer, screenSize } from '~components/dev-hub/theme';

const CONSISTENT_NAV_DESKTOP_HEIGHT = '88px';
const CONSISTENT_NAV_MOBILE_HEIGHT = '56px';

const NavWrapper = styled(ImportedNav)`
    height: ${CONSISTENT_NAV_DESKTOP_HEIGHT};
    z-index: ${layer.superFront};
    @media ${screenSize.upToLarge} {
        height: ${CONSISTENT_NAV_MOBILE_HEIGHT};
    }
`;

const ConsistentNav = () => <NavWrapper onTrack={console.log} />;

export default ConsistentNav;
