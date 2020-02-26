import React from 'react';
import styled from '@emotion/styled';
import Folder from './icons/folder';
import { P3 } from './text';
import { colorMap, size } from './theme';

const Label = styled('label')`
    input[type='file'] {
        display: none;
    }
    cursor: pointer;
    color: ${colorMap.greyLightTwo};
`;
const UploadContainer = styled('div')`
    align-items: flex-end;
    display: flex;
`;
const Description = styled(P3)`
    padding-left: ${size.small};
`;
const UploadButton = ({ name, label, file, ...props }) => {
    return (
        <Label>
            <UploadContainer tabIndex="0" role="button">
                <Folder />
                <Description collapse>
                    {file && file.name ? file.name : label}
                </Description>
                <input type="file" name={name} {...props} />
            </UploadContainer>
        </Label>
    );
};

export default UploadButton;
