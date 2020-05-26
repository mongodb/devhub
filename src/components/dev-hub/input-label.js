import React from 'react';
import styled from '@emotion/styled';
import { colorMap, fontSize, layer, lineHeight } from './theme';

export const InputLabel = styled('label')`
    background: linear-gradient(
        180deg,
        transparent 50%,
        ${colorMap.greyDarkTwo} 50%
    );
    color: ${colorMap.greyLightTwo};
    font-family: 'Fira Mono', monospace;
    font-size: ${fontSize.small};
    line-height: ${lineHeight.tiny};
    left: ${({ labelAbsoluteLeft }) => labelAbsoluteLeft}px;
    position: absolute;
    top: ${({ labelStartTop }) => labelStartTop}px;
    opacity: 0;
    z-index: ${layer.front};
`;

export default ({ children, ...props }) => {
    return <InputLabel {...props}>{children}</InputLabel>;
};
