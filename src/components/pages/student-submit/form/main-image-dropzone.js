import React, { useEffect, useState } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { useDropzone } from 'react-dropzone';
import { H5, P2 } from '~components/dev-hub/text';
import { layer, screenSize } from '~components/dev-hub/theme';
import useMedia from '~hooks/use-media';

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

const Dropzone = styled('div')`
    align-items: center;
    background: ${({ theme }) => theme.colorMap.greyDarkThree};
    border: 1px dashed ${({ theme }) => theme.colorMap.greyLightThree};
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    min-height: ${DROPZONE_HEIGHT};
    justify-content: center;
    position: relative;
    text-align: center;
    @media ${screenSize.upToMedium} {
        min-height: ${DROPZONE_MOBILE_HEIGHT};
    }
`;

const FullInput = styled('input')`
    position: absolute;
    content: '';
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: ${layer.superBack};
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

// Adopted from https://react-dropzone.js.org/#section-previews
const MainImageDropzone = ({ onChange }) => {
    const [file, setFile] = useState(null);
    const isMobile = useMedia(screenSize.upToMedium);
    const onDrop = files => {
        if (files.length) {
            const mainImage = files[0];
            setFile(
                Object.assign(mainImage, {
                    preview: URL.createObjectURL(mainImage),
                })
            );
        } else {
            setFile(null);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        maxFiles: 1,
        onDrop,
    });

    useEffect(() => {
        onChange(file);
    }, [file, onChange]);

    useEffect(
        () => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            file && URL.revokeObjectURL(file.preview);
        },
        [file]
    );

    return (
        <section>
            <Dropzone {...getRootProps()}>
                <FullInput
                    required
                    {...getInputProps()}
                    // getInputProps() puts on a display: none
                    // We want to display for the validation message
                    style={{ display: 'block' }}
                />
                {file ? (
                    <ThumbnailContent>
                        <Image src={file.preview} />
                    </ThumbnailContent>
                ) : isMobile ? (
                    <GreyP2 collapse css={firaMono}>
                        + Add Image
                    </GreyP2>
                ) : (
                    <GreyH5 collapse>Drag and drop/upload image</GreyH5>
                )}
            </Dropzone>
        </section>
    );
};

export default MainImageDropzone;
