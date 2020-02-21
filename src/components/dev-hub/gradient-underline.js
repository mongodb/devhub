import React from 'react';
import styled from '@emotion/styled';
const Underline = styled('span')`
    ${props => `background-image: linear-gradient(transparent, transparent),
        linear-gradient(transparent, transparent),
        ${props.gradient}`};
    background-repeat: no-repeat;
    background-position: 120%, 122%, 0 130%;
    background-size: 100% 33%;
    box-decoration-break: clone;
    display: inline;
    text-decoration: none;
`;

export default ({ gradient, children }) => (
    <Underline gradient={gradient}>{children}</Underline>
);
