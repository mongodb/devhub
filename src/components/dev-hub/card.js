import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { animationSpeed, colorMap, gradientMap, size, fontSize } from './theme';
import { H5, P } from './text';
import Link from './link';
import TagList from './blog-tag-list';

const fullSizeAbsolute = css`
    bottom: 0;
    height: 100%;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
`;

const GradientOverlay = styled('div')`
    background: ${gradientMap.tealVioletPurple};
    background-size: cover;
    border-radius: ${size.small};
    mix-blend-mode: overlay;
    ${fullSizeAbsolute}
`;
const GradientBase = styled('div')`
    background: ${gradientMap.tealVioletReverse};
    background-size: cover;
    border-radius: ${size.small};
    ${fullSizeAbsolute}
`;

const Image = styled('img')`
    border-radius: ${size.small};
    display: block;
    height: 100%;
    overflow: hidden;
    position: relative;
    width: 100%;
    ${props =>
        props.gradient &&
        css`
            filter: saturate(0%);
            opacity: 0.75;
        `}
`;

const ImageWrapper = styled('div')`
    border-radius: ${size.small};
    margin-bottom: ${size.medium};
    overflow: hidden;
    padding: 0;
    position: relative;
    width: 100%;
`;
const hoverStyles = css`
    &:hover,
    &:active {
        background-color: ${colorMap.greyDarkTwo};
        color: inherit;
        cursor: pointer;
        ${Image} {
            transform: scale(1.1);
            /* TODO - fix this transition (probably by making the image a background image) */
            /* transition: transform ${animationSpeed.slow}; */
        }
    }
`;
const Wrapper = styled('div')`
    background-color: transparent;
    border-radius: ${size.small};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 410px; /* 360px + padding + hand wavey amount */
    padding: ${size.medium};
    text-decoration: none;
    transition: background-color ${animationSpeed.medium};
    width: ${({ width = 'auto' }) => width};
    ${({ highlight }) => highlight && `background: rgba(255, 255, 255, 0.3);`};
    ${({ isClickable }) => isClickable && hoverStyles}
`;
const truncate = maxLines => css`
    /* truncate text to 3 lines */
    display: -webkit-box;
    -webkit-line-clamp: ${maxLines}; /* supported cross browser */
    -webkit-box-orient: vertical;
    overflow: hidden;
`;
const DescriptionText = styled(P)`
    color: ${colorMap.greyLightTwo};
    font-size: ${fontSize.small};
`;
const CardTitle = styled(H5)`
    text-align: left;
`;

// eslint-disable-next-line no-unused-vars
const noop = (_eventType, _properties, _options, _callback) => {};

/**
 * @param {Object<string, any>} props
 * @property {node} props.children
 * @property {string} props.className
 * @property {string} props.description
 * @property {bool?} props.gradient
 * @property {bool?} props.highlight
 * @property {string?} props.href
 * @property {string?} props.image
 * @property {number?} props.maxDescriptionLines
 * @property {number?} props.maxTitleLines
 * @property {func?} props.onClick
 * @property {string[]?} props.tags
 * @property {string?} props.target
 * @property {string?} props.title
 * @property {string?} props.to
 */

const Card = ({
    children,
    className,
    description,
    gradient,
    href,
    image,
    maxDescriptionLines = 3,
    maxTitleLines = 2,
    onClick = noop,
    to,
    tags,
    target,
    title,
}) => {
    const isLink = !!(to || href);
    const ContentWrapper = isLink ? Wrapper.withComponent(Link) : Wrapper;
    const linkAttrs = !isLink
        ? {}
        : {
              to,
              href,
              target,
          };
    const cardTitle = title || children;
    const isClickable = onClick !== noop || isLink;
    return (
        <ContentWrapper
            onClick={onClick}
            {...linkAttrs}
            isClickable={isClickable}
            className={className}
        >
            <div>
                {image && (
                    <ImageWrapper>
                        {gradient && <GradientBase />}
                        <Image src={image} />
                        {gradient && <GradientOverlay />}
                    </ImageWrapper>
                )}
                {cardTitle && (
                    <CardTitle
                        css={truncate(maxTitleLines)}
                        collapse={!description}
                    >
                        {cardTitle}
                    </CardTitle>
                )}
                {description && (
                    <DescriptionText css={truncate(maxDescriptionLines)}>
                        {description}
                    </DescriptionText>
                )}
            </div>

            {tags && <TagList tags={tags} />}
        </ContentWrapper>
    );
};

export default Card;
