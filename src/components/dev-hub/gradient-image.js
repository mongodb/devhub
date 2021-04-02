import React from 'react';
import styled from '@emotion/styled';
import { css, useTheme } from '@emotion/react';
import { size } from './theme';

const fullSizeAbsolute = css`
    bottom: 0;
    height: 100%;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
`;
const GradientBase = styled('div')`
    background: ${({ gradient }) => gradient};
    background-size: cover;
    border-radius: ${size.small};
    z-index: 1;
    ${fullSizeAbsolute}
`;
const GradientOverlay = styled('div')`
    background: ${({ gradient }) => gradient};
    background-size: cover;
    border-radius: ${size.small};
    mix-blend-mode: overlay;
    z-index: 3;
    ${fullSizeAbsolute}
`;
const Image = styled('img')`
    border-radius: ${size.small};
    display: block;
    height: 100%;
    overflow: hidden;
    position: relative;
    width: 100%;
    z-index: 2;
    filter: saturate(0%);
    opacity: 0.75;
`;

const ImageWrapper = styled('div')`
    border-radius: ${size.small};
    margin-bottom: ${size.medium};
    padding: 0;
    position: relative;
    width: 100%;
`;

const GradientImage = ({ bottomGradient, topGradient, src, ...props }) => {
    const theme = useTheme();
    bottomGradient = bottomGradient
        ? bottomGradient
        : theme.gradientMap.violetMagenta;
    topGradient = topGradient ? topGradient : theme.gradientMap.violetMagenta;
    return (
        <ImageWrapper {...props}>
            <GradientOverlay gradient={topGradient} />
            <Image src={src} />
            <GradientBase gradient={bottomGradient} />
        </ImageWrapper>
    );
};

export default GradientImage;
