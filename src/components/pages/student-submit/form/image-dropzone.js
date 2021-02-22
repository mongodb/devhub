import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { useDropzone } from 'react-dropzone';
import { H5, P2, P3 } from '~components/dev-hub/text';
import { layer, screenSize, size } from '~components/dev-hub/theme';
import DropzoneThumbnail, { THUMBNAIL_WIDTH } from './dropzone-thumbnail';
import useMedia from '~hooks/use-media';

const DROPZONE_HEIGHT = '232px';
const DROPZONE_MOBILE_HEIGHT = '48px';

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

const Dropzone = styled('div')`
    align-items: center;
    background: ${({ theme }) => theme.colorMap.greyDarkThree};
    border: 1px dashed ${({ theme }) => theme.colorMap.greyLightThree};
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: ${DROPZONE_HEIGHT};
    justify-content: center;
    position: relative;
    text-align: center;
    @media ${screenSize.upToMedium} {
        height: ${DROPZONE_MOBILE_HEIGHT};
    }
`;

const ThumbnailGrid = styled('div')`
    column-gap: ${size.mediumLarge};
    display: grid;
    grid-template-columns: repeat(6, ${THUMBNAIL_WIDTH});
    grid-template-rows: ${size.xlarge};
    margin-top: 48px;
    position: relative;
    row-gap: 4px;
    text-align: center;
    @media ${screenSize.upToMedium} {
        grid-gap: ${size.default};
        grid-template-columns: repeat(3, 74px);
        grid-template-rows: 74px 74px;
        margin: ${size.mediumLarge} auto 0;
        width: fit-content;
    }
`;

const ImageLabelText = styled(P3)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
    position: absolute;
    top: -20px;
    left: 14px;
    @media ${screenSize.upToMedium} {
        top: -20px;
        left: 8px;
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

const addAcceptedFilesToArray = (files, acceptedFiles, maxFiles) => {
    let newFiles = [
        ...acceptedFiles.map(file =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
            })
        ),
        ...files,
    ];
    if (newFiles.length > maxFiles) {
        newFiles = newFiles.slice(0, maxFiles);
    }
    return newFiles;
};

const removeFileFromArray = (files, index) => {
    const newFiles = [...files];
    newFiles[index] = null;
    return newFiles;
};

const removeFileValueFromInput = input => (input.value = '');

// Adopted from https://react-dropzone.js.org/#section-previews
const ImageDropzone = ({ onChange, maxFiles = 6 }) => {
    const isMobile = useMedia(screenSize.upToLarge);
    const [files, setFiles] = useState(new Array(maxFiles).fill(null));
    const filesWithoutNulls = useMemo(() => files.filter(f => !!f), [files]);

    const onDrop = acceptedFiles => {
        const newFiles = addAcceptedFilesToArray(
            files,
            acceptedFiles,
            maxFiles
        );
        setFiles(newFiles);
    };

    const { getRootProps, getInputProps, inputRef } = useDropzone({
        accept: 'image/*',
        onDrop: onDrop,
    });

    const removeImage = useCallback(
        i => () => {
            const newFiles = removeFileFromArray(files, i);
            const hasNoImages = newFiles.every(file => !file);
            if (hasNoImages) {
                // Clear any value in the image field since at least one is required
                removeFileValueFromInput(inputRef.current);
            }
            setFiles(newFiles);
        },
        [files, inputRef]
    );

    useEffect(() => {
        onChange(filesWithoutNulls);
    }, [filesWithoutNulls, onChange]);

    useEffect(
        () => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            files.forEach(file => file && URL.revokeObjectURL(file.preview));
        },
        [files]
    );

    const thumbs = files.map((file, index) => (
        <DropzoneThumbnail
            file={file}
            key={file ? file.name : index}
            removeImage={removeImage(index)}
        />
    ));

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
                {isMobile ? (
                    <GreyP2 collapse css={firaMono}>
                        + Add Images
                    </GreyP2>
                ) : (
                    <>
                        <GreyH5>Drag and drop images (6 max)</GreyH5>
                        <GreyP2 collapse>
                            or <Underline>browse</Underline> to choose a file
                        </GreyP2>
                        <GreyP3>
                            (1600 x 1200 or larger recommended, up to 10MB each)
                        </GreyP3>
                    </>
                )}
            </Dropzone>
            <ThumbnailGrid>
                <ImageLabelText collapse>Main Image</ImageLabelText>
                {thumbs}
            </ThumbnailGrid>
        </section>
    );
};

export default ImageDropzone;
