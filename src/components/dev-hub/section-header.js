import React from 'react';
import styled from '@emotion/styled';
import { colorMap, fontSize, screenSize } from './theme';
import { P } from './text';

const SectionHeader = styled('div')`
    border-bottom: 1px solid ${colorMap.greyDarkOne};
    font-size: ${fontSize.small};
    letter-spacing: 2px;
    text-transform: uppercase;
    @media ${screenSize.upToMedium} {
        display: block;
    }
`;

export default ({ text }) => (
    <SectionHeader>
        <div>
            <P>{text}</P>
        </div>
    </SectionHeader>
);
