import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { colorMap, lineHeight, fontSize, size } from './theme';

const pre = css`
    background-color: ${colorMap.devBlack};
    border: 1px solid ${colorMap.bluebirdMedium};
    border-left-width: 3px;
    color: ${colorMap.devWhite};
    font-family: 'Source Code Pro', monospace;
    margin: 0 0 ${size.default} 0;
    padding: ${size.default};
    white-space: pre-wrap;
    word-wrap: break-word;
`;

const bottomMargin = css`
    margin: 0 0 ${size.default} 0;
`;

const noMargin = css`
    margin: 0;
`;

const handleCollapse = ({ collapse }) => (collapse ? noMargin : bottomMargin);

const commonHeading = css`
    font-family: 'Fira Mono', monospace;
    font-weight: bold;
`;

export const H1 = styled('h1')`
    ${commonHeading}
    font-size: ${fontSize.h1};
    line-height: ${lineHeight.h1};
    ${handleCollapse}
`;

export const H2 = styled('h2')`
    ${commonHeading}
    font-size: ${fontSize.h2};
    line-height: ${lineHeight.h2};
    ${handleCollapse}
`;

export const H3 = styled('h3')`
    ${commonHeading}
    font-size: ${fontSize.h3};
    line-height: ${lineHeight.h3};
    ${handleCollapse}
`;

export const H4 = styled('h4')`
    ${commonHeading}
    font-size: ${fontSize.h4};
    line-height: ${lineHeight.h4};
    ${handleCollapse}
`;

export const H5 = styled('h5')`
    ${commonHeading}
    font-size: ${fontSize.h5};
    line-height: ${lineHeight.h5};
    ${handleCollapse}
`;
export const P = styled('p')`
    font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
    ${handleCollapse}
`;
export const Pre = styled('pre')`
    ${pre};
`;
