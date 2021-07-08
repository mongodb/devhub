import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { withPrefix } from 'gatsby';
import { screenSize, size } from './theme';
import { createShadowElement } from './utils';
import DEFAULT_AUTHOR_IMAGE from '../../images/2x/Default-Profile@2x.png';

const DEFAULT_GRADIENT_POSITION_OFFSET = 6;
const DEFAULT_IMAGE_HEIGHT = 50;

const imageStyles = (defaultImage, background, isInternalReference) => css`
    background-image: ${background
        ? `url(${isInternalReference ? withPrefix(background) : background})`
        : `url(${defaultImage})`};
    background-position: center center;
    background-size: auto 100%;
`;

const hideImageOnMobile = css`
    @media ${screenSize.upToMedium} {
        display: none;
    }
`;

const AuthorImageContainer = styled('div')`
    height: ${({ height, gradientOffset }) => height + gradientOffset}px;
    position: relative;
    width: ${({ width, gradientOffset }) => width + gradientOffset}px;
    &:before {
        ${({ gradientOffset, theme }) =>
            createShadowElement(
                theme.gradientMap.greenTealOffset,
                '50%',
                0,
                -gradientOffset
            )};
        height: ${({ height, gradientOffset }) => height + gradientOffset}px;
        width: ${({ width, gradientOffset }) => width + gradientOffset}px;
        z-index: unset;
    }
    ${({ hideOnMobile }) => hideOnMobile && hideImageOnMobile}
`;

const CircularImage = styled('div')`
    border-radius: 50%;
    height: ${({ height }) => height}px;
    margin-right: ${size.medium};
    position: relative;
    width: ${({ width }) => width}px;
    ${({ defaultImage, image, isInternalReference }) =>
        imageStyles(defaultImage, image, isInternalReference)};
`;

const AuthorImage = ({
    defaultImage = DEFAULT_AUTHOR_IMAGE,
    image,
    isInternalReference = true,
    gradientOffset = DEFAULT_GRADIENT_POSITION_OFFSET,
    hideOnMobile = true,
    height = DEFAULT_IMAGE_HEIGHT,
    width = DEFAULT_IMAGE_HEIGHT,
    ...props
}) => (
    <AuthorImageContainer
        data-test="author-image"
        hideOnMobile={hideOnMobile}
        gradientOffset={gradientOffset}
        height={height}
        width={width}
        {...props}
    >
        <CircularImage
            defaultImage={defaultImage}
            isInternalReference={isInternalReference}
            height={height}
            width={width}
            image={image}
        />
    </AuthorImageContainer>
);

export default AuthorImage;
