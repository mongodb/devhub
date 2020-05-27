import React from 'react';
import { darkTheme, size } from './theme';
import { P5 } from './text';
import styled from '@emotion/styled';

const Badge = styled('div')`
    bottom: 0;
    background-color: ${darkTheme.colorMap.greyDarkThree};
    font-family: akzidenz;
    letter-spacing: 1px;
    margin: ${size.default};
    padding: 1px ${size.xsmall};
    position: absolute;
    text-transform: uppercase;
    ${({ color }) => color && `border: 1px solid ${color}`}
`;

const determineColor = contentType => {
    switch (contentType) {
        case 'youtube':
        case 'twitch':
            return darkTheme.colorMap.salmon;
        case 'podcast':
            return darkTheme.colorMap.yellow;
        case 'article':
            return darkTheme.colorMap.teal;
        default:
            return null;
    }
};

const badgeContent = contentType =>
    contentType === 'youtube' || contentType === 'twitch'
        ? contentType + ' video'
        : contentType;

export default ({ contentType, color = '' }) => (
    <Badge color={color || determineColor(contentType)}>
        <P5 bold collapse>
            {badgeContent(contentType)}
        </P5>
    </Badge>
);
