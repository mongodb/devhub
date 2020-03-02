import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { gradientMap, screenSize, size } from './theme';
import { createShadowElement } from './utils';
import DEFAULT_AUTHOR_IMAGE from '../../images/2x/Default-Profile@2x.png';

const DEFAULT_GRADIENT_POSITION_OFFSET = 6;
const DEFAULT_IMAGE_HEIGHT = 50;

const imageStyles = background => css`
    background-image: ${background
        ? `url(${background})`
        : `url(${DEFAULT_AUTHOR_IMAGE})`};
    background-position: center center;
    background-size: auto 100%;
`;

const AuthorImageContainer = styled('div')`
    position: relative;
    &:before {
        ${({ gradientOffset }) =>
            createShadowElement(
                gradientMap.greenTealOffset,
                size.large,
                0,
                -gradientOffset
            )};
        height: ${({ height, gradientOffset }) => height + gradientOffset}px;
        width: ${({ width, gradientOffset }) => width + gradientOffset}px;
        z-index: unset;
    }
`;

const CircularImage = styled('div')`
    @media ${screenSize.upToMedium} {
        display: none;
    }
    margin-right: ${size.medium};
    position: relative;
    border-radius: 50%;
    height: ${({ height }) => height}px;
    width: ${({ width }) => width}px;
    ${({ image }) => imageStyles(image)};
`;

const AuthorImage = ({
    image,
    gradientOffset = DEFAULT_GRADIENT_POSITION_OFFSET,
    height = DEFAULT_IMAGE_HEIGHT,
    width = DEFAULT_IMAGE_HEIGHT,
    ...props
}) => (
    <AuthorImageContainer
        gradientOffset={gradientOffset}
        height={height}
        width={width}
        {...props}
    >
        <CircularImage height={height} width={width} image={image} />
    </AuthorImageContainer>
);

export default AuthorImage;
