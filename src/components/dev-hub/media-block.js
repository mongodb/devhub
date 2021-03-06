import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { screenSize, size } from './theme';

const ContentWrapper = styled('span')`
    grid-area: content;
    height: 100%;
`;

const columnWidth = (mediaWidth, reverse) => {
    if (mediaWidth) {
        return reverse ? `auto ${mediaWidth}` : `${mediaWidth} auto`;
    }
    return '1fr 1fr';
};

const columnSizes = ({ mediaWidth, reverse }) => css`
    @media ${screenSize.largeAndUp} {
        grid-template-columns: ${columnWidth(mediaWidth, reverse)};
    }
`;

const gridStructure = ({ reverse, reverseImageOnMobile, flexible }) => css`
    grid-template-areas: ${reverse ? '"content image";' : '"image content";'};
    @media ${screenSize.upToLarge} {
        /* If flexible is true, this will allow media block to allow content to stack on smaller screens */
        ${flexible &&
        `grid-template-areas: 'image'
        'content';`}
        ${reverseImageOnMobile &&
        `grid-template-areas: 'content'
        'image';`}
    }
`;

const MediaBlockContainer = styled('div')`
    display: grid;
    width: 100%;
    ${columnSizes};
    ${gridStructure};
    @media ${screenSize.upToLarge} {
        justify-items: center;
    }
`;

const MediaWrapper = styled('div')`
    grid-area: image;
    @media ${screenSize.largeAndUp} {
        ${({ reverse }) =>
            reverse
                ? `margin-left: ${size.medium};`
                : `margin-right: ${size.medium};`};
    }
    max-width: 100%;
    > img {
        width: 100%;
    }
    @media ${screenSize.upToLarge} {
        margin-right: 0;
        ${({ fullWidthContentOnMobile }) =>
            fullWidthContentOnMobile && 'max-width: 540px; width: 100%;'};
    }
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
    fullWidthContentOnMobile,
    flexible = true,
    reverseImageOnMobile = false,
}) => (
    <MediaBlockContainer
        flexible={flexible}
        reverse={reverse}
        reverseImageOnMobile={reverseImageOnMobile}
        mediaWidth={mediaWidth}
        className={className}
    >
        {mediaComponent && (
            <MediaWrapper
                fullWidthContentOnMobile={fullWidthContentOnMobile}
                reverse={reverse}
            >
                {mediaComponent}
            </MediaWrapper>
        )}
        <ContentWrapper>{children}</ContentWrapper>
    </MediaBlockContainer>
);

export default MediaBlock;
