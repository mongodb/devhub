import React from 'react';
import styled from '@emotion/styled';
import { UnifiedNav } from '@mdb/consistent-nav';
import { layer } from '~components/dev-hub/theme';

const FrontLayeredNav = styled(UnifiedNav)`
    z-index: ${layer.superFront};
`;

const ConsistentNav = () => (
    <FrontLayeredNav position="sticky" property="DEVHUB" />
);

export default ConsistentNav;
