import React, { useState } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { P } from './text';
import { size } from './theme';

const DESKTOP_GALLERY_MAX_HEIGHT = '600px';
const THUMBNAIL_SIZE = '56px';

const activeThumbnailBorder = theme => css`
    border: 2px solid ${theme.colorMap.darkGreen};
`;

const CurrentImage = styled('img')`
    border-radius: ${size.xsmall};
    max-height: ${DESKTOP_GALLERY_MAX_HEIGHT};
    object-fit: cover;
    width: 100%;
`;

const ThumbnailWrapper = styled('div')`
    cursor: pointer;
`;

const ImageThumbnail = styled('img')`
    /* Use transparent border to prevent unintended jarring from a resize on active */
    border: 2px solid transparent;
    border-radius: ${size.xsmall};
    height: ${THUMBNAIL_SIZE};
    width: ${THUMBNAIL_SIZE};
    ${({ isActive, theme }) => isActive && activeThumbnailBorder(theme)};
`;

const GalleryItemsContainer = styled('div')`
    display: flex;
    justify-content: space-between;
`;

/**
 *
 * @param {[object]} images: A list of img src values/captions
 */
const ImageGallery = ({ images }) => {
    const [currentImage, setCurrentImage] = useState(images[0]);
    const updateCurrentImage = img => setCurrentImage(img);
    return (
        <div>
            <CurrentImage src={currentImage.src} />
            <GalleryItemsContainer>
                <P>{currentImage.caption}</P>
                <div>
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
                </div>
            </GalleryItemsContainer>
        </div>
    );
};

export default ImageGallery;
