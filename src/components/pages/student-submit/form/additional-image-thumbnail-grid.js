import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { screenSize, size } from '~components/dev-hub/theme';
import DropzoneThumbnail, {
    THUMBNAIL_MOBILE_HEIGHT,
    THUMBNAIL_MOBILE_WIDTH,
    THUMBNAIL_WIDTH,
} from './dropzone-thumbnail';

const ThumbnailGrid = styled('div')`
    column-gap: ${size.mediumLarge};
    display: grid;
    grid-template-columns: repeat(
        ${({ maxFiles }) => maxFiles},
        ${THUMBNAIL_WIDTH}
    );
    grid-template-rows: ${size.xlarge};
    margin: ${size.default} auto 0;
    position: relative;
    row-gap: 4px;
    text-align: center;
    width: fit-content;
    @media ${screenSize.upToMedium} {
        grid-gap: ${size.default};
        grid-auto-flow: row;
        grid-template-columns: repeat(auto-fit, ${THUMBNAIL_MOBILE_WIDTH});
        grid-template-rows: ${THUMBNAIL_MOBILE_HEIGHT};
        margin: ${size.default} auto 0;
        justify-content: center;
        width: unset;
    }
`;

const removeFileFromArray = (files, index) => {
    const newFiles = [...files];
    newFiles[index] = null;
    return newFiles;
};

// Adopted from https://react-dropzone.js.org/#section-previews
const AdditionalImageThumbnailGrid = ({ files, maxFiles, setFiles }) => {
    const removeImage = useCallback(
        i => () => {
            const newFiles = removeFileFromArray(files, i);
            setFiles(newFiles);
        },
        [files, setFiles]
    );

    return (
        <ThumbnailGrid maxFiles={maxFiles}>
            {files.map((file, index) => (
                <DropzoneThumbnail
                    file={file}
                    key={file ? file.name : index}
                    removeImage={removeImage(index)}
                />
            ))}
        </ThumbnailGrid>
    );
};

export default AdditionalImageThumbnailGrid;
