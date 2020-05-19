import React from 'react';
import styled from '@emotion/styled';
import { colorMap, lineHeight } from './theme';
import { P } from './text';

const SectionHeader = styled('div')`
    border-bottom: 1px solid ${colorMap.greyDarkOne};
    letter-spacing: 3px;
    text-transform: uppercase;
`;
const StyledP = styled(P)`
    line-height: ${lineHeight.tiny};
`;

export default ({ children }) => (
    <SectionHeader>
        <StyledP>{children}</StyledP>
    </SectionHeader>
);
