import React from 'react';
import { colorMap, size } from './theme';
import { P5 } from './text';
import styled from '@emotion/styled';

const CardBadge = styled('div')`
    bottom: 0;
    background-color: ${colorMap.greyDarkThree};
    display: inline-block;
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
            return colorMap.salmon;
        case 'podcast':
            return colorMap.yellow;
        case 'article':
            return colorMap.teal;
        default:
            return null;
    }
};

export default ({ contentType, color = '' }) => {
    return (
        <CardBadge color={color || determineColor(contentType)}>
            <P5 collapse>
                <strong>
                    {contentType === 'youtube' || contentType === 'twitch'
                        ? contentType + ' video'
                        : contentType}
                </strong>
            </P5>
        </CardBadge>
    );
};
