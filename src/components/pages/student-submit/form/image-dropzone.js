import React, { useEffect, useState } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { useDropzone } from 'react-dropzone';
import Button from '~components/dev-hub/button';
import CloseIcon from '~components/dev-hub/icons/close-icon';
import { H5, P, P3 } from '~components/dev-hub/text';
import { size } from '~components/dev-hub/theme';

const greyText = css`
    color: #b8c4c2;
`;

const Underline = styled('span')`
    text-decoration: underline;
`;

const GreyH5 = styled(H5)`
    ${greyText};
`;

const GreyP = styled(P)`
    ${greyText};
`;

const GreyP3 = styled(P3)`
    ${greyText};
`;

const RemoveButton = styled(Button)`
    position: absolute;
    top: 0;
    right: 0;
    padding: 0;
    color: black;
`;

const Dropzone = styled('div')`
    align-items: center;
    background: ${({ theme }) => theme.colorMap.greyDarkThree};
    border: 1px dashed ${({ theme }) => theme.colorMap.greyLightThree};
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: 232px;
    justify-content: center;
    text-align: center;
`;

const ThumbnailsContainer = styled('aside')`
    display: flex;
    flex-wrap: wrap;
    margin-top: ${size.default};
`;

const ThumbnailWrapper = styled('div')`
    border-radius: 10px;
    margin: 0 24px 8px 0;
    width: 96px;
    height: 64px;
    padding: 4px;
    display: inline-flex;
    border: 1px dashed ${({ theme }) => theme.colorMap.greyLightThree};
    :last-of-type {
        margin-right: 0;
    }
`;

const ThumbnailContent = styled('div')`
    display: flex;
    min-width: 0;
    overflow: hidden;
    position: relative;
`;

const Image = styled('img')`
    display: block;
    height: 100%;
    width: auto;
`;

const Thumbnail = ({ file, removeImage }) => {
    const isFile = !!file;
    const preview = isFile && file.preview;
    return (
        <ThumbnailWrapper>
            <ThumbnailContent>
                {preview ? (
                    <div>
                        <Image src={preview} />
                        <RemoveButton onClick={removeImage}>
                            <CloseIcon height="10" width="10" />
                        </RemoveButton>
                    </div>
                ) : null}
            </ThumbnailContent>
        </ThumbnailWrapper>
    );
};

// Adopted from https://react-dropzone.js.org/#section-previews
const ImageDropzone = ({ maxFiles = 6 }) => {
    const [files, setFiles] = useState([null, null, null, null, null, null]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            const newFiles = [
                ...acceptedFiles.map(file =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                ),
                ...files,
            ].slice(0, maxFiles);
            setFiles(newFiles);
        },
    });

    const thumbs = files.map((file, index) => (
        <Thumbnail
            file={file}
            key={file ? file.name : index}
            removeImage={() => {
                const newFiles = [...files];
                newFiles[index] = null;
                setFiles(newFiles);
            }}
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
                <input {...getInputProps()} />
                <GreyH5>Drag and drop images (6 max)</GreyH5>
                <GreyP collapse>
                    or <Underline>browse</Underline> to choose a file
                </GreyP>
                <GreyP3>
                    (1600 x 1200 or larger recommended, up to 10MB each)
                </GreyP3>
            </Dropzone>
            <ThumbnailsContainer>{thumbs}</ThumbnailsContainer>
        </section>
    );
};

export default ImageDropzone;
