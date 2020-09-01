import React from 'react';
import { size } from './theme';
import { P5 } from './text';
import styled from '@emotion/styled';
import { useTheme } from 'emotion-theming';

const Badge = styled('div')`
    bottom: 0;
    background-color: ${({ theme }) => theme.colorMap.greyDarkThree};
    font-family: akzidenz;
    letter-spacing: 1px;
    margin: ${size.default};
    padding: 1px ${size.xsmall};
    position: absolute;
    text-transform: uppercase;
    ${({ color }) => color && `border: 1px solid ${color}`};
`;

const determineColor = (contentType, theme) => {
    switch (contentType) {
        case 'youtube':
        case 'twitch':
            return theme.colorMap.salmon;
        case 'podcast':
            return theme.colorMap.yellow;
        case 'article':
            return theme.colorMap.teal;
        default:
            return null;
    }
};

const badgeContent = contentType =>
    contentType === 'youtube' || contentType === 'twitch'
        ? contentType + ' video'
        : contentType;

export default ({ contentType, color = '', ...props }) => {
    const theme = useTheme();
    return (
        <Badge color={color || determineColor(contentType, theme)} {...props}>
            <P5 bold collapse>
                {badgeContent(contentType)}
            </P5>
        </Badge>
    );
};
