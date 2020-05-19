import React from 'react';
import styled from '@emotion/styled';
import { colorMap, lineHeight } from './theme';
import { P4 } from './text';

const SectionHeader = styled('div')`
    border-bottom: 1px solid ${colorMap.greyDarkOne};
    letter-spacing: 3px;
    text-transform: uppercase;
`;
const StyledP4 = styled(P4)`
    line-height: ${lineHeight.tiny};
`;

export default ({ children }) => (
    <SectionHeader>
        <StyledP4>{children}</StyledP4>
    </SectionHeader>
);
