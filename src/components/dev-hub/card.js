import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import Button from './button';
import { animationSpeed, colorMap, lineHeight, size, fontSize } from './theme';
import { H5, P } from './text';
import Link from './link';
import TagList from './blog-tag-list';
import VideoModal from './video-modal';
import Badge from './badge';

const Image = styled('img')`
    bottom: 0;
    border-radius: ${size.small};
    display: block;
    left: 0;
    margin: auto;
    overflow: hidden;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    ${props =>
        props.gradient &&
        css`
            filter: saturate(0%);
            opacity: 0.75;
        `}
`;

const ImageWrapper = styled('div')`
    background-color: black;
    border-radius: ${size.small};
    margin-bottom: ${size.medium};
    overflow: hidden;
    /* Create 1:1 aspect ratio using top padding */
    padding: 100% 0 0;
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
    max-width: ${({ maxwidth }) => `${maxwidth}px`};
    padding: ${size.medium};
    text-decoration: none;
    transition: background-color ${animationSpeed.medium};
    width: ${({ width = 'auto' }) => width};
    ${({ highlight }) => highlight && `background: rgba(255, 255, 255, 0.3);`};
    ${({ isclickable }) => isclickable && hoverStyles};
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

const VideoThumbnailButton = styled(Button)`
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    position: absolute;
`;

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
    badge,
    to,
    tags,
    target,
    title,
    video,
    videoModalThumbnail,
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
            data-test="card"
            onClick={onClick}
            {...linkAttrs}
            maxwidth={maxWidth}
            isclickable={isClickable}
            className={className}
        >
            <div>
                {!collapseImage && (
                    <ImageWrapper>
                        {image && <Image loading="lazy" src={image} alt="" />}
                        {video && (
                            <VideoModal
                                id={video.videoId}
                                name={video.mediaType}
                                trigger={<VideoThumbnailButton play />}
                                thumbnail={videoModalThumbnail || image}
                            />
                        )}
                        {badge && <Badge contentType={badge} />}
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
