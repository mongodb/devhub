import React from 'react';
import styled from '@emotion/styled';
import { size } from '~components/dev-hub/theme';
import Icon from '@leafygreen-ui/icon';
import Button from '~components/dev-hub/button';

export const THUMBNAIL_WIDTH = '96px';

const RemoveButton = styled(Button)`
    padding: 0;
    position: absolute;
    right: 0;
    top: 0;
`;

const ThumbnailWrapper = styled('div')`
    border: 1px dashed ${({ theme }) => theme.colorMap.greyLightThree};
    border-radius: 10px;
    grid-row-start: 2;
    height: ${size.xlarge};
    margin: 0 ${size.mediumLarge} ${size.xsmall} 0;
    padding: 4px;
    width: ${THUMBNAIL_WIDTH};
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
