import React from 'react';
import styled from '@emotion/styled';
import { colorMap, layer } from './theme';

export const InputLabel = styled('label')`
    background: linear-gradient(
        180deg,
        transparent 50%,
        ${colorMap.greyDarkTwo} 50%
    );
    font-family: 'Fira Mono', monospace;
    left: ${({ labelAbsoluteLeft }) => labelAbsoluteLeft}px;
    position: absolute;
    top: ${({ labelStartTop }) => labelStartTop}px;
    opacity: 0;
    z-index: ${layer.front};
`;

export default ({ children, ...props }) => {
    return <InputLabel {...props}>{children}</InputLabel>;
};
