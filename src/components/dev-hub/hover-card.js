import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import Link from './link';
import { animationSpeed, size } from './theme';

const centerContentAbsolutely = css`
    left: 50%;
    opacity: 0;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
`;

const fillEntireSpaceAbsolutely = css`
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
`;

const hoverBackground = theme => css`
    background-color: ${theme.colorMap.greyDarkThree};
    border-radius: ${size.small};
    opacity: 0;
    transition: opacity ${animationSpeed.fast} linear;
    ${fillEntireSpaceAbsolutely};
`;

const HoverContent = styled('div')`
    transition: opacity ${animationSpeed.fast} linear;
    visibility: hidden;
    ${centerContentAbsolutely};
`;

const showHoverContent = css`
    ${HoverContent} {
        opacity: 1;
        visibility: visible;
    }
`;

const Image = styled('img')`
    border-radius: ${size.small};
    height: 100%;
    /* Preserve aspect ratio but fill appropriately */
    object-fit: cover;
    width: 100%;
`;

const RoundedContainer = styled('div')`
    border-radius: ${size.small};
    display: block;
    height: 100%;
    position: relative;
    text-align: center;
    width: 100%;
    :before {
        ${({ theme }) => hoverBackground(theme)};
    }
    &:hover,
    &:focus {
        /* Remove any focus effects from Link */
        color: unset;
        ${showHoverContent};
        :before {
            opacity: 0.8;
        }
    }
`;

const HoverCard = ({ alt, children, image, to, ...props }) => {
    const ContentWrapper = to
        ? RoundedContainer.withComponent(Link)
        : RoundedContainer;
    return (
        <ContentWrapper tabIndex="0" to={to} {...props}>
            <Image alt={alt} loading="lazy" src={image} />
            <HoverContent>{children}</HoverContent>
        </ContentWrapper>
    );
};

export default HoverCard;
