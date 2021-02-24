import React, { useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import { useDropzone } from 'react-dropzone';
import { layer, screenSize } from '~components/dev-hub/theme';

const DROPZONE_HEIGHT = '232px';
const DROPZONE_MOBILE_HEIGHT = '48px';

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

// Adopted from https://react-dropzone.js.org/#section-previews
const ImageDropzone = ({
    className,
    children,
    files,
    required,
    setFiles,
    onChange,
    maxFiles = 5,
}) => {
    const supportsMultipleFiles = !!(maxFiles > 1);
    const filesWithoutNulls = useMemo(() => files.filter(f => !!f), [files]);

    const onDrop = acceptedFiles => {
        const newFiles = addAcceptedFilesToArray(
            files,
            acceptedFiles,
            maxFiles
        );
        setFiles(newFiles);
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        maxFiles,
        multiple: supportsMultipleFiles,
        onDrop: onDrop,
    });

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

    return (
        <section>
            <Dropzone {...getRootProps()} className={className}>
                <FullInput
                    required={required}
                    {...getInputProps()}
                    // getInputProps() puts on a display: none
                    // We want to display for the validation message
                    style={{ display: 'block' }}
                />
                {children}
            </Dropzone>
        </section>
    );
};

export default ImageDropzone;
