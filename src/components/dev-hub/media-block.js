import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { screenSize, size } from './theme';

const ContentWrapper = styled('span')`
    grid-area: content;
    height: 100%;
`;

const columnWidth = (mediaWidth, reverse) => {
    if (mediaWidth) {
        return reverse ? `auto ${mediaWidth}px` : `${mediaWidth}px auto`;
    }
    return '1fr 1fr';
};

const columnSizes = ({ mediaWidth, reverse }) => css`
    @media ${screenSize.largeAndUp} {
        grid-template-columns: ${columnWidth(mediaWidth, reverse)};
    }
`;

const gridStructure = ({ reverse, flexible }) => css`
    grid-template-areas: ${reverse ? '"content image";' : '"image content";'};
    @media ${screenSize.upToLarge} {
        /* If flexible is true, this will allow media block to allow content to stack on smaller screens */
        ${flexible &&
            `grid-template-areas: ${
                reverse ? '"content" "image"' : '"image" "content"'
            };`}
    }
`;

const MediaBlockContainer = styled('div')`
    ${({ shouldMatchChildrenHeight }) =>
        !shouldMatchChildrenHeight && 'display: grid'};
    ${columnSizes};
    ${gridStructure};
    @media ${screenSize.upToLarge} {
        justify-items: center;
    }
    ${({ shouldMatchChildrenHeight }) =>
        shouldMatchChildrenHeight && 'position: relative'};
`;

const matchChildHeight = css`
    height: 100%;
    margin-right: 0;
    position: absolute;
    right: 0;
    > img {
        height: 100%;
        width: unset;
    }
`;

const MediaWrapper = styled('div')`
    grid-area: image;
    margin-right: ${size.medium};
    max-width: 100%;
    > img {
        width: 100%;
    }
    /* match child height */
    ${({ shouldMatchChildrenHeight }) =>
        shouldMatchChildrenHeight && matchChildHeight}
`;

/**
 * @param {Object<string, any>} props
 * @property {node} props.children
 * @property {bool} props.flexible
 * @property {node} props.mediaComponent
 * @property {number?} props.mediaWidth
 * @property {bool?} props.reverse
 */
const MediaBlock = ({
    children,
    className,
    mediaComponent,
    mediaWidth,
    reverse,
    flexible = true,
    shouldMatchChildrenHeight = false,
}) => (
    <MediaBlockContainer
        flexible={flexible}
        reverse={reverse}
        mediaWidth={mediaWidth}
        className={className}
        shouldMatchChildrenHeight={shouldMatchChildrenHeight}
    >
        {mediaComponent && (
            <MediaWrapper shouldMatchChildrenHeight={shouldMatchChildrenHeight}>
                {mediaComponent}
            </MediaWrapper>
        )}
        <ContentWrapper>{children}</ContentWrapper>
    </MediaBlockContainer>
);

export default MediaBlock;
