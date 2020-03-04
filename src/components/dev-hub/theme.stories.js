import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from '@emotion/styled';
import { colorMap, size, fontSize } from './theme';

const ColorBlock = styled('div')`
    background-color: ${props => props.color};
    position: relative;
    height: 80px;
    width: 80px;
    border-radius: ${size.small};
    margin-bottom: ${size.small};
`;
const Color = styled('div')`
    font-family: 'Fira Mono', monospace;
    font-size: ${fontSize.xsmall};
    display: inline-block;
    margin: ${size.medium};
    text-align: center;
`;

/**
 *
 */

function renderColors() {
    const colors = Object.keys(colorMap);
    return colors.map(color => (
        <Color>
            <ColorBlock color={colorMap[color]} />
            <span>
                {color} ({colorMap[color]})
            </span>
        </Color>
    ));
}

storiesOf('Theme', module).add('Colors', renderColors);
