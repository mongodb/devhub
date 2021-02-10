import React from 'react';
import styled from '@emotion/styled';
import AuthorImage from '~components/dev-hub/author-image';
import { size } from '~components/dev-hub/theme';
import Button from '~components/dev-hub/button';
import { P3 } from '~components/dev-hub/text';

const IMAGE_PREVIEW_SIZE = 36;

const CondensedContainer = styled('div')`
    border-bottom: 1px solid ${({ theme }) => theme.colorMap.greyDarkOne};
    clear: both;
    align-items: center;
    display: grid;
    grid-template-columns: 36px auto 24px 49px;
    column-gap: 16px;
    padding-bottom: ${size.mediumLarge};
`;

const PreviewText = styled(P3)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
`;

const EditButton = styled(Button)`
    color: ${({ theme }) => theme.colorMap.devWhite};
    font-family: akzidenz;
    padding: 0;
    text-decoration: none;
`;

const RemoveButton = styled(Button)`
    color: ${({ theme }) => theme.colorMap.salmon};
    font-family: akzidenz;
    padding: 0;
    text-decoration: none;
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
