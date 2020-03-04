import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from '@emotion/styled';
import { colorMap, size, fontSize } from './theme';

const ColorBlock = styled('div')`
    background-color: ${props => props.color};
    border-radius: ${size.small};
    height: 80px;
    margin-bottom: ${size.small};
    position: relative;
    width: 80px;
`;
const Color = styled('div')`
    display: inline-block;
    font-family: 'Fira Mono', monospace;
    font-size: ${fontSize.xsmall};
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
