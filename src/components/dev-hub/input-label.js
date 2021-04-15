import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { fontSize, layer, lineHeight } from './theme';

const useEllipsisOnOverflow = labelAbsoluteLeft => css`
    max-width: calc(100% - ${labelAbsoluteLeft}px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const InputLabel = styled('label')`
    background: linear-gradient(
        180deg,
        transparent 50%,
        ${({ theme }) => theme.colorMap.greyDarkTwo} 50%
    );
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
    font-family: 'Fira Mono', monospace;
    font-size: ${fontSize.small};
    line-height: ${lineHeight.tiny};
    left: ${({ labelAbsoluteLeft }) => labelAbsoluteLeft}px;
    position: absolute;
    opacity: 0;
    top: ${({ labelStartTop }) => labelStartTop}px;
    z-index: ${layer.front};
    ${({ labelAbsoluteLeft }) => useEllipsisOnOverflow(labelAbsoluteLeft)}
`;

export default ({ children, ...props }) => {
    return <InputLabel {...props}>{children}</InputLabel>;
};
