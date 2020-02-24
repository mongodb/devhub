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
        font-size: 28px;
        line-height: 38px;
    }
`;

export const H2 = styled('h2')`
    ${commonHeading}
    font-size: ${fontSize.xxlarge};
    line-height: ${lineHeight.xxlarge};
    ${handleCollapse}
    @media ${screenSize.upToMedium} {
        font-size: ${fontSize.large};
        line-height: 34px;
    }
`;

export const H3 = styled('h3')`
    ${commonHeading}
    font-size: ${fontSize.xlarge};
    line-height: ${lineHeight.xlarge};
    ${handleCollapse}
    @media ${screenSize.upToMedium} {
        font-size: ${fontSize.medium};
        line-height: 30px;
    }
`;

export const H4 = styled('h4')`
    ${commonHeading}
    font-size: ${fontSize.large};
    line-height: ${lineHeight.large};
    ${handleCollapse}
        @media ${screenSize.upToMedium} {
        font-size: ${fontSize.default};
        line-height: 26px;
    }
`;

export const H5 = styled('h5')`
    ${commonHeading}
    font-size: ${fontSize.medium};
    line-height: ${lineHeight.medium};
    ${handleCollapse}
    @media ${screenSize.upToMedium} {
        font-size: ${fontSize.small};
        line-height: ${lineHeight.small};
    }
`;
const PStyles = styled('p')`
    font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
    ${handleCollapse}
`;
export const P = styled(PStyles)`
    @media ${screenSize.upToMedium} {
        font-size: ${fontSize.small};
        line-height: ${lineHeight.small};
    }
`;
export const P2 = styled(PStyles)`
    font-size: ${fontSize.small};
    line-height: ${lineHeight.small};
    @media ${screenSize.upToMedium} {
        font-size: ${fontSize.tiny};
        line-height: ${lineHeight.tiny};
    }
`;
export const P3 = styled(PStyles)`
    font-size: ${fontSize.tiny};
    line-height: ${lineHeight.tiny};
    @media ${screenSize.upToMedium} {
        font-size: ${fontSize.xsmall};
        line-height: ${lineHeight.xsmall};
    }
`;
export const P4 = styled(PStyles)`
    font-size: ${fontSize.xsmall};
    line-height: ${lineHeight.xsmall};
    @media ${screenSize.upToMedium} {
        font-size: ${fontSize.micro};
        line-height: ${lineHeight.micro};
    }
`;
export const P5 = styled(PStyles)`
    font-size: ${fontSize.micro};
    line-height: ${lineHeight.micro};
`;
export const SubHeader = styled(PStyles)`
    color: ${colorMap.greyLightTwo};
    font-size: ${fontSize.large};
    line-height: ${lineHeight.medium};
    @media ${screenSize.upToMedium} {
        font-size: ${fontSize.tiny};
        line-height: ${lineHeight.small};
    }
`;
export const Pre = styled('pre')`
    ${pre};
`;
