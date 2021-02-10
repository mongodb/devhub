import React, { useCallback, useEffect, useState } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { useDropzone } from 'react-dropzone';
import { H5, P, P3 } from '~components/dev-hub/text';
import { layer, size } from '~components/dev-hub/theme';
import DropzoneThumbnail, { THUMBNAIL_WIDTH } from './dropzone-thumbnail';

const DROPZONE_HEIGHT = '232px';

const greyText = theme => css`
    color: ${theme.colorMap.greyLightTwo};
`;

const Underline = styled('span')`
    text-decoration: underline;
`;

const GreyH5 = styled(H5)`
    ${({ theme }) => greyText(theme)};
`;

const GreyP = styled(P)`
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
`;

const ThumbnailGrid = styled('div')`
    column-gap: ${size.mediumLarge};
    display: grid;
    grid-template-columns: repeat(6, ${THUMBNAIL_WIDTH});
    grid-template-rows: ${size.medium} ${size.xlarge};
    margin-top: ${size.mediumLarge};
    row-gap: 4px;
    text-align: center;
`;

const ImageLabelText = styled(P3)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
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

// Adopted from https://react-dropzone.js.org/#section-previews
const ImageDropzone = ({ onChange, maxFiles = 6 }) => {
    const [files, setFiles] = useState([null, null, null, null, null, null]);
    const onDrop = acceptedFiles => {
        const newFiles = [
            ...acceptedFiles.map(file =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            ),
            ...files,
        ].slice(0, maxFiles);
        onChange(newFiles.filter(f => !!f));
        setFiles(newFiles);
    };
    const { getRootProps, getInputProps, inputRef } = useDropzone({
        accept: 'image/*',
        onDrop: onDrop,
    });

    const removeImage = useCallback(
        i => () => {
            const newFiles = [...files];
            newFiles[i] = null;
            const actualImages = newFiles.filter(f => !!f);
            const hasNoImages = !actualImages.length;
            onChange(actualImages);
            if (hasNoImages) {
                inputRef.current.value = '';
            }
            setFiles(newFiles);
        },
        [files, inputRef, onChange]
    );

    const thumbs = files.map((file, index) => (
        <DropzoneThumbnail
            file={file}
            key={file ? file.name : index}
            removeImage={removeImage(index)}
        />
    ));

    useEffect(
        () => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            files.forEach(file => file && URL.revokeObjectURL(file.preview));
        },
        [files]
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
                <GreyH5>Drag and drop images (6 max)</GreyH5>
                <GreyP collapse>
                    or <Underline>browse</Underline> to choose a file
                </GreyP>
                <GreyP3>
                    (1600 x 1200 or larger recommended, up to 10MB each)
                </GreyP3>
            </Dropzone>
            <ThumbnailGrid>
                <ImageLabelText collapse>Main Image</ImageLabelText>
                {thumbs}
            </ThumbnailGrid>
        </section>
    );
};

export default ImageDropzone;
