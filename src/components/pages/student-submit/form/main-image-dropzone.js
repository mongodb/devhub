import React, { useEffect, useState } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { H5, P2 } from '~components/dev-hub/text';
import { screenSize } from '~components/dev-hub/theme';
import useMedia from '~hooks/use-media';
import ImageDropzone from '~components/dev-hub/image-dropzone';

const DROPZONE_HEIGHT = '64px';
const DROPZONE_MOBILE_HEIGHT = '48px';

const firaMono = css`
    font-family: 'Fira Mono';
`;

const greyText = theme => css`
    color: ${theme.colorMap.greyLightTwo};
`;

const GreyH5 = styled(H5)`
    ${({ theme }) => greyText(theme)};
`;

const GreyP2 = styled(P2)`
    ${({ theme }) => greyText(theme)};
`;

const ThumbnailContent = styled('div')`
    display: flex;
    max-height: 300px;
    min-width: 0;
    overflow: hidden;
    position: relative;
`;

const Image = styled('img')`
    display: block;
    max-height: 100%;
    margin: 0 auto;
    object-fit: contain;
    width: auto;
`;

const MaxHeightImageDropzone = styled(ImageDropzone)`
    min-height: ${DROPZONE_HEIGHT};
    height: unset;
    @media ${screenSize.upToMedium} {
        min-height: ${DROPZONE_MOBILE_HEIGHT};
    }
`;

// Adopted from https://react-dropzone.js.org/#section-previews
const MainImageDropzone = ({ onChange }) => {
    const [files, setFiles] = useState([]);
    const isMobile = useMedia(screenSize.upToMedium);

    useEffect(() => {
        onChange(files);
    }, [files, onChange]);

    return (
        <MaxHeightImageDropzone
            files={files}
            maxFiles={1}
            required
            onChange={onChange}
            setFiles={setFiles}
        >
            {files.length ? (
                <ThumbnailContent>
                    <Image src={files[0].preview} />
                </ThumbnailContent>
            ) : isMobile ? (
                <GreyP2 collapse css={firaMono}>
                    + Add Image
                </GreyP2>
            ) : (
                <GreyH5 collapse>Drag and drop/upload image</GreyH5>
            )}
        </MaxHeightImageDropzone>
    );
};

export default MainImageDropzone;
