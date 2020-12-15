import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import Link from './link';
import { size } from './theme';

const hoverBackground = theme => css`
    :before {
        content: '';
        background-color: ${theme.colorMap.greyDarkThree};
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: ${size.small};
        transition: opacity 0.15s linear;
    }
`;

const HoverContent = styled('div')`
    position: absolute;
    top: 50%;
    left: 50%;
    opacity: 0;
    transform: translate(-50%, -50%);
    visibility: hidden;
    transition: opacity 0.15s linear;
`;
const RoundedContainer = styled('div')`
    border-radius: ${size.small};
    text-align: center;
    position: relative;
    height: 100%;
    width: 100%;
    ${({ theme }) => hoverBackground(theme)};
    &:hover,
    &:focus {
        div {
            opacity: 1;
            visibility: visible;
        }
        :before {
            opacity: 0.8;
        }
    }
`;

const Image = styled('img')`
    border-radius: ${size.small};
    height: 100%;
    object-fit: cover;
    width: 100%;
`;

const HoverCard = ({ alt, children, image, to, ...props }) => {
    const ContentWrapper = to
        ? RoundedContainer.withComponent(Link)
        : RoundedContainer;
    return (
        <ContentWrapper tabIndex="0" role="tooltip" {...props}>
            <Image alt={alt} loading="lazy" src={image} />
            <HoverContent>{children}</HoverContent>
        </ContentWrapper>
    );
};

export default HoverCard;
