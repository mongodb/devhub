import React, { useEffect, useState } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import Icon from '@leafygreen-ui/icon';
import { useDropzone } from 'react-dropzone';
import Button from '~components/dev-hub/button';
import { H5, P, P3 } from '~components/dev-hub/text';
import { size } from '~components/dev-hub/theme';

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

const ThumbnailWrapper = styled('div')`
    border-radius: 10px;
    width: 96px;
    height: ${size.xlarge};
    padding: 4px;
    margin: 0 ${size.mediumLarge} ${size.xsmall} 0;
    grid-row-start: 2;
    border: 1px dashed ${({ theme }) => theme.colorMap.greyLightThree};
    :last-of-type {
        margin-right: 0;
    }
`;

const ThumbnailContent = styled('div')`
    display: flex;
    height: 100%;
    min-width: 0;
    overflow: hidden;
    position: relative;
`;

const Image = styled('img')`
    display: block;
    height: 100%;
    width: auto;
`;

const ThumbnailGrid = styled('div')`
    display: grid;
    grid-template-rows: ${size.medium} ${size.xlarge};
    grid-template-columns: repeat(6, 96px);
    text-align: center;
    row-gap: 4px;
    column-gap: ${size.mediumLarge};
    margin-top: ${size.mediumLarge};
`;

const ImageLabelText = styled(P3)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
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
                            <Icon
                                glyph="XWithCircle"
                                size="small"
                                fill="#D8D8D8"
                            />
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
            label={index === 0 ? 'Main Image' : null}
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
            <ThumbnailGrid>
                <ImageLabelText collapse>Main Image</ImageLabelText>
                {thumbs}
            </ThumbnailGrid>
        </section>
    );
};

export default ImageDropzone;
