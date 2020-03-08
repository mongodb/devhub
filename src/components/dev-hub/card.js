import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { animationSpeed, colorMap, lineHeight, size, fontSize } from './theme';
import { H5, P } from './text';
import Link from './link';
import TagList from './blog-tag-list';

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
            transition: transform ${animationSpeed.slow};
        }
    }
`;
const Wrapper = styled('div')`
    background-color: transparent;
    border-radius: ${size.small};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: ${({ maxWidth }) => `${maxWidth}px`};
    padding: ${size.medium};
    text-decoration: none;
    transition: background-color ${animationSpeed.medium};
    width: ${({ width = 'auto' }) => width};
    ${({ highlight }) => highlight && `background: rgba(255, 255, 255, 0.3);`};
    ${({ isClickable }) => isClickable && hoverStyles}
`;
const truncate = maxLines => css`
    display: -webkit-box;
    -webkit-line-clamp: ${maxLines}; /* supported cross browser */
    -webkit-box-orient: vertical;
    overflow: hidden;
`;
const DescriptionText = styled(P)`
    color: ${colorMap.greyLightTwo};
    font-size: ${fontSize.small};
    line-height: ${lineHeight.small};
`;
const CardTitle = styled(H5)`
    text-align: left;
`;

/**
 * @param {Object<string, any>} props
 * @property {node} props.children
 * @property {string} props.className
 * @property {boolean?} props.collapseImage
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
 * @property {number?} props.maxWidth
 */

const Card = ({
    children,
    className,
    collapseImage = false,
    description,
    href,
    image,
    maxDescriptionLines = 3,
    maxTitleLines = 2,
    onClick,
    to,
    tags,
    target,
    title,
    maxWidth = 410 /* 360px + padding + hand wavey amount */,
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
    const isClickable = onClick || isLink;
    return (
        <ContentWrapper
            onClick={onClick}
            {...linkAttrs}
            maxWidth={maxWidth}
            isClickable={isClickable}
            className={className}
            collapseImage={collapseImage}
        >
            <div>
                {!collapseImage && (
                    <ImageWrapper>
                        {image && <Image src={image} alt="" />}
                    </ImageWrapper>
                )}
                {title && (
                    <CardTitle
                        css={truncate(maxTitleLines)}
                        collapse={!description}
                    >
                        {title}
                    </CardTitle>
                )}
                {description && (
                    <DescriptionText css={truncate(maxDescriptionLines)}>
                        {description}
                    </DescriptionText>
                )}
            </div>
            {children}
            {tags && <TagList tags={tags} />}
        </ContentWrapper>
    );
};

export default Card;
