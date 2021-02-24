import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { useDropzone } from 'react-dropzone';
import { H5 } from '~components/dev-hub/text';
import { layer, screenSize } from '~components/dev-hub/theme';

const DROPZONE_HEIGHT = '64px';
const DROPZONE_MOBILE_HEIGHT = '48px';

const greyText = theme => css`
    color: ${theme.colorMap.greyLightTwo};
`;

const GreyH5 = styled(H5)`
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
        height: ${DROPZONE_MOBILE_HEIGHT};
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
const MainImageDropzone = ({ onChange }) => {
    const [file, setFile] = useState(null);

    const { getRootProps, getInputProps, inputRef } = useDropzone({
        accept: 'image/*',
        onDrop: setFile,
    });

    const removeImage = useCallback(() => {
        removeFileValueFromInput(inputRef.current);
        setFile(null);
    }, [inputRef]);

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
                <GreyH5 collapse>Drag and drop/upload image</GreyH5>
            </Dropzone>
        </section>
    );
};

export default MainImageDropzone;
