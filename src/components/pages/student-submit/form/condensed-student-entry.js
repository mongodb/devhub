import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import AuthorImage from '~components/dev-hub/author-image';
import { size } from '~components/dev-hub/theme';
import Button from '~components/dev-hub/button';
import { P3 } from '~components/dev-hub/text';

const IMAGE_PREVIEW_SIZE = 36;
const EDIT_BUTTON_SIZE = size.mediumLarge;
const REMOVE_BUTTON_SIZE = '49px';

const CondensedContainer = styled('div')`
    border-bottom: 1px solid ${({ theme }) => theme.colorMap.greyDarkOne};
    clear: both;
    align-items: center;
    display: grid;
    grid-template-columns: ${`${IMAGE_PREVIEW_SIZE}px`} auto ${EDIT_BUTTON_SIZE} ${REMOVE_BUTTON_SIZE};
    column-gap: ${size.default};
    padding-bottom: ${size.mediumLarge};
`;

const PreviewText = styled(P3)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
`;

const modifyButtonStyling = css`
    font-family: akzidenz;
    padding: 0;
    text-decoration: none;
`;

const EditButton = styled(Button)`
    color: ${({ theme }) => theme.colorMap.devWhite};
    ${modifyButtonStyling};
`;

const RemoveButton = styled(Button)`
    color: ${({ theme }) => theme.colorMap.salmon};
    ${modifyButtonStyling};
`;

const CondensedStudentEntry = ({ authorImage, state, onRemove }) => (
    <CondensedContainer>
        <AuthorImage
            isInternalReference={false}
            height={IMAGE_PREVIEW_SIZE}
            width={IMAGE_PREVIEW_SIZE}
            image={authorImage}
        />
        <div>
            <PreviewText collapse>
                {state.first_name} {state.last_name}
            </PreviewText>
            <PreviewText collapse>{state.school_name}</PreviewText>
        </div>
        <EditButton>
            <P3 collapse>Edit</P3>
        </EditButton>
        <RemoveButton onClick={onRemove}>
            <P3 collapse>Remove</P3>
        </RemoveButton>
    </CondensedContainer>
);

export default CondensedStudentEntry;
