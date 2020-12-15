import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import Link from './link';
import { size } from './theme';

const hoverBackground = theme => css`
    background-color: ${theme.colorMap.greyDarkThree};
    border-radius: ${size.small};
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    opacity: 0;
    top: 0;
    transition: opacity 0.15s linear;
`;

const HoverContent = styled('div')`
    left: 50%;
    opacity: 0;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: opacity 0.15s linear;
    visibility: hidden;
`;

const Image = styled('img')`
    border-radius: ${size.small};
    height: 100%;
    object-fit: cover;
    width: 100%;
`;

const RoundedContainer = styled('div')`
    border-radius: ${size.small};
    height: 100%;
    position: relative;
    text-align: center;
    width: 100%;
    :before {
        ${({ theme }) => hoverBackground(theme)};
    }
    &:hover,
    &:focus {
        color: unset;
        ${HoverContent} {
            opacity: 1;
            visibility: visible;
        }
        /* Parent controls the background opacity */
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
        <ContentWrapper role="tooltip" tabIndex="0" to={to} {...props}>
            <Image alt={alt} loading="lazy" src={image} />
            <HoverContent>{children}</HoverContent>
        </ContentWrapper>
    );
};

export default HoverCard;
