import React from 'react';
import styled from '@emotion/styled';

const Underline = styled('div')`
    ${props => `background-image: linear-gradient(transparent, transparent),
        linear-gradient(transparent, transparent),
        linear-gradient(to right, ${props.firstColor}, ${props.secondColor})`};
    background-repeat: no-repeat;
    background-position: 120%, 122%, 0 130%;
    background-size: 100% 33%;
    box-decoration-break: clone;
    display: inline;
    text-decoration: none;
`;

export default ({ firstColor, secondColor, children }) => (
    <Underline firstColor={firstColor} secondColor={secondColor}>
        {children}
    </Underline>
);
