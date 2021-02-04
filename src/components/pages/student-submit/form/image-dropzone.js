import React, { useEffect, useState } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { useDropzone } from 'react-dropzone';
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

const Dropzone = styled('div')`
    background: #21313c;
    /* B&W/Grey 5 */

    border: 1px dashed #9fa1a2;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 232px;
`;

const ThumbnailsContainer = styled('aside')`
    display: flex;
    flex-wrap: wrap;
    margin-top: ${size.default};
`;

const ThumbnailWrapper = styled('div')`
    border-radius: 10px;
    margin: 0 8px 8px 0;
    width: 96px;
    height: 64px;
    padding: 4px;
    display: inline-flex;
    border: 1px dashed #9fa1a2;
`;

const ThumbnailContent = styled('div')`
    display: flex;
    min-width: 0;
    overflow: hidden;
`;

const Image = styled('img')`
    display: block;
    height: 100%;
    width: auto;
`;

const Thumbnail = ({ file }) => {
    const isFile = !!file;
    const key = isFile && file.name;
    const preview = isFile && file.preview;
    return (
        <ThumbnailWrapper key={key}>
            <ThumbnailContent>
                {preview ? <Image src={preview} /> : null}
            </ThumbnailContent>
        </ThumbnailWrapper>
    );
};

// Adopted from https://react-dropzone.js.org/#section-previews
const ImageDropzone = () => {
    const [files, setFiles] = useState([null]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFiles(
                acceptedFiles.map(file =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            );
        },
    });

    const thumbs = files.map(file => (
        <Thumbnail file={file} key={file && file.name} />
    ));

    useEffect(
        () => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            files.forEach(file => file && URL.revokeObjectURL(file.preview));
        },
        [files]
    );

    return (
        <section className="container">
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
