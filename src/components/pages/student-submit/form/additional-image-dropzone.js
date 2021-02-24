import React, { useState } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { H5, P2, P3 } from '~components/dev-hub/text';
import { screenSize } from '~components/dev-hub/theme';
import AdditionalImageThumbnailGrid from './additional-image-thumbnail-grid';
import useMedia from '~hooks/use-media';
import ImageDropzone from '~components/dev-hub/image-dropzone';

const MAX_ADDITIONAL_IMAGES = 5;

const firaMono = css`
    font-family: 'Fira Mono';
`;

const greyText = theme => css`
    color: ${theme.colorMap.greyLightTwo};
`;

const Underline = styled('span')`
    text-decoration: underline;
`;

const GreyH5 = styled(H5)`
    ${({ theme }) => greyText(theme)};
`;

const GreyP2 = styled(P2)`
    ${({ theme }) => greyText(theme)};
`;

const GreyP3 = styled(P3)`
    ${({ theme }) => greyText(theme)};
`;

const AdditionalImageDropzone = ({ onChange }) => {
    const isMobile = useMedia(screenSize.upToMedium);
    const [files, setFiles] = useState(
        new Array(MAX_ADDITIONAL_IMAGES).fill(null)
    );

    return (
        <div>
            <ImageDropzone
                files={files}
                onChange={onChange}
                setFiles={setFiles}
            >
                {isMobile ? (
                    <GreyP2 collapse css={firaMono}>
                        + Add Images
                    </GreyP2>
                ) : (
                    <>
                        <GreyH5>Drag and drop images (5 max)</GreyH5>
                        <GreyP2 collapse>
                            or <Underline>browse</Underline> to choose a file
                        </GreyP2>
                        <GreyP3>
                            (1600 x 1200 or larger recommended, up to 10MB each)
                        </GreyP3>
                    </>
                )}
            </ImageDropzone>
            <AdditionalImageThumbnailGrid
                files={files}
                maxFiles={5}
                setFiles={setFiles}
            />
        </div>
    );
};

export default AdditionalImageDropzone;
