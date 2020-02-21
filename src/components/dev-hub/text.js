import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { colorMap, lineHeight, fontSize, screenSize, size } from './theme';

const pre = css`
    background-color: ${colorMap.devBlack};
    border: 1px solid ${colorMap.bluebirdMedium};
    border-left-width: 3px;
    color: ${colorMap.devWhite};
    font-family: 'Fira Mono', monospace;
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
    font-size: ${fontSize.jumbo};
    line-height: ${lineHeight.jumbo};
    ${handleCollapse}
    @media ${screenSize.upToMedium} {
        font-size: ${fontSize.xlarge};
    }
`;

export const H2 = styled('h2')`
    ${commonHeading}
    font-size: ${fontSize.xxlarge};
    line-height: ${lineHeight.xxlarge};
    ${handleCollapse}
        @media ${screenSize.upToMedium} {
        font-size: ${fontSize.large};
        line-height: ${lineHeight.large};
    }
`;

export const H3 = styled('h3')`
    ${commonHeading}
    font-size: ${fontSize.xlarge};
    line-height: ${lineHeight.xlarge};
    ${handleCollapse}
        @media ${screenSize.upToMedium} {
        font-size: ${fontSize.medium};
    }
`;

export const H4 = styled('h4')`
    ${commonHeading}
    font-size: ${fontSize.large};
    line-height: ${lineHeight.large};
    ${handleCollapse}
        @media ${screenSize.upToMedium} {
        font-size: ${fontSize.default};
    }
`;

export const H5 = styled('h5')`
    ${commonHeading}
    font-size: ${fontSize.medium};
    line-height: ${lineHeight.medium};
    ${handleCollapse}
        @media ${screenSize.upToMedium} {
        font-size: ${fontSize.small};
    }
`;
export const P = styled('p')`
    font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
    ${handleCollapse}
    @media ${screenSize.upToMedium} {
        font-size: ${fontSize.small};
    }
`;
export const Pre = styled('pre')`
    ${pre};
`;
