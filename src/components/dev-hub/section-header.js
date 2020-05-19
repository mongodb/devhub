import React from 'react';
import styled from '@emotion/styled';
import { colorMap, fontSize, screenSize } from './theme';
import { P } from './text';

const SectionHeader = styled('div')`
    border-bottom: 1px solid ${colorMap.greyDarkOne};
    font-size: ${fontSize.small};
    letter-spacing: 2px;
    @media ${screenSize.upToMedium} {
        display: block;
    }
    text-transform: uppercase;
`;

export default ({ text }) => (
    <SectionHeader>
        <P>{text}</P>
    </SectionHeader>
);
