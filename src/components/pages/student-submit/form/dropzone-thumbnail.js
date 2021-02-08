import React from 'react';
import styled from '@emotion/styled';
import { size } from '~components/dev-hub/theme';
import Icon from '@leafygreen-ui/icon';
import Button from '~components/dev-hub/button';

export const THUMBNAIL_WIDTH = '96px';

const RemoveButton = styled(Button)`
    position: absolute;
    top: 0;
    right: 0;
    padding: 0;
`;

const ThumbnailWrapper = styled('div')`
    border-radius: 10px;
    width: ${THUMBNAIL_WIDTH};
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

const DropzoneThumbnail = ({ file, removeImage }) => {
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

export default DropzoneThumbnail;
