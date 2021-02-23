import React, { useState } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { P } from './text';
import { screenSize, size } from './theme';

const DESKTOP_GALLERY_HEIGHT = '450px';
const DESKTOP_GALLERY_WIDTH = '1200px';
const MAX_MOBILE_GALLERY_HEIGHT = '450px';
const MOBILE_BREAKPOINT = screenSize.upToLarge;
const THUMBNAIL_SIZE = '56px';

const activeThumbnailBorder = theme => css`
    border: 2px solid ${theme.colorMap.darkGreen};
`;

const hoverThumbnailBorder = theme => css`
    border: 2px solid ${theme.colorMap.greyLightTwo};
`;

const CurrentImage = styled('img')`
    border-radius: ${size.xsmall};
    display: block;
    height: ${DESKTOP_GALLERY_HEIGHT};
    margin-bottom: ${size.xsmall};
    object-fit: contain;
    width: ${DESKTOP_GALLERY_WIDTH};
    @media ${MOBILE_BREAKPOINT} {
        height: unset;
        max-height: ${MAX_MOBILE_GALLERY_HEIGHT};
    }
`;

const ThumbnailWrapper = styled('div')`
    cursor: pointer;
    height: ${THUMBNAIL_SIZE};
    width: ${THUMBNAIL_SIZE};
`;

const ImageThumbnail = styled('img')`
    /* Use transparent border to prevent unintended jarring from a resize on active */
    border: 2px solid transparent;
    border-radius: ${size.xsmall};
    height: ${THUMBNAIL_SIZE};
    object-fit: cover;
    width: ${THUMBNAIL_SIZE};
    &:hover,
    &:active,
    &:focus {
        ${({ theme }) => hoverThumbnailBorder(theme)};
    }
    ${({ isActive, theme }) => isActive && activeThumbnailBorder(theme)};
`;

const GalleryItemsContainer = styled('div')`
    display: flex;
    justify-content: space-between;
    @media ${MOBILE_BREAKPOINT} {
        flex-direction: column-reverse;
    }
`;

const ThumbnailContainer = styled('div')`
    display: grid;
    grid-auto-flow: column;
    grid-gap: ${size.xsmall};
    grid-template-columns: repeat(auto-fill, ${THUMBNAIL_SIZE});
    grid-template-rows: ${THUMBNAIL_SIZE};
    @media ${MOBILE_BREAKPOINT} {
        grid-auto-flow: row;
        justify-content: center;
        padding-bottom: ${size.mediumLarge};
    }
`;

/**
 *
 * @param {[object]} images: A list of img src values/captions
 */
const ImageGallery = ({ description, images }) => {
    const [currentImage, setCurrentImage] = useState(images[0]);
    const updateCurrentImage = img => setCurrentImage(img);
    return (
        <div>
            <CurrentImage src={currentImage.src} />
            <GalleryItemsContainer>
                <P>{description}</P>
                <ThumbnailContainer>
                    {images.map(img => (
                        <ThumbnailWrapper
                            key={img.src}
                            onClick={() => updateCurrentImage(img)}
                        >
                            <ImageThumbnail
                                isActive={currentImage.src === img.src}
                                src={img.src}
                            />
                        </ThumbnailWrapper>
                    ))}
                </ThumbnailContainer>
            </GalleryItemsContainer>
        </div>
    );
};

export default ImageGallery;
