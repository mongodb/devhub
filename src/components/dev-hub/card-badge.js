import React from 'react';
import { colorMap, size } from './theme';
import { P5 } from './text';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

const CardBadge = styled('div')`
    align: left;
    bottom: 0;
    background-color: ${colorMap.greyDarkThree};
    display: inline-block;
    font-family: 'Akzidenz-Grotesk';
    margin: ${size.default};
    padding: 1px ${size.xsmall};
    position: absolute;
    text-transform: uppercase;
    ${props =>
        props.color &&
        css`
            border: 1px solid ${props.color};'
        `}
`;

export default ({ contentType, color = '' }) => {
    switch (contentType) {
        case 'youtube':
        case 'twitch':
            return (
                <CardBadge color={color || colorMap.salmon}>
                    <P5 collapse>
                        <strong>{contentType + ' video'}</strong>
                    </P5>
                </CardBadge>
            );
        case 'podcast':
            return (
                <CardBadge color={color || colorMap.yellow}>
                    <P5 collapse>
                        <strong>{contentType}</strong>
                    </P5>
                </CardBadge>
            );
        case 'article':
            return (
                <CardBadge color={color || colorMap.teal}>
                    <P5 collapse>
                        <strong>{contentType}</strong>
                    </P5>
                </CardBadge>
            );
        default:
            return null;
    }
};
