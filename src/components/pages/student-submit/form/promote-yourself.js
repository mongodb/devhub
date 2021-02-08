import React, { useCallback, useRef, useState } from 'react';
import { useTheme } from 'emotion-theming';
import AuthorImage from '~components/dev-hub/author-image';
import Input from '~components/dev-hub/input';
import TextArea from '~components/dev-hub/text-area';
import SubmitFormFieldset from './submit-form-fieldset';
import styled from '@emotion/styled';
import { screenSize, size } from '~components/dev-hub/theme';
import Button from '~components/dev-hub/button';
import Folder from '~components/dev-hub/icons/folder';
import { P3 } from '~components/dev-hub/text';

const FOLDER_SIZE = '21px';
const IMAGE_PREVIEW_SIZE = 36;
const INPUT_BOX_WIDTH = '336px';

const ButtonText = styled(P3)`
    text-decoration: none;
`;

const ButtonWithImage = styled(Button)`
    display: flex;
    align-items: center;
    padding: 0;
    text-decoration: none;
    color: ${({ theme }) => theme.colorMap.devWhite};
`;

const ButtonImage = styled('div')`
    padding-right: 12px;
`;

const HiddenInput = styled('input')`
    display: none;
`;

const LinksSection = styled('div')`
    display: grid;
    clear: both;
    grid-template-columns: repeat(auto-fill, ${INPUT_BOX_WIDTH});
    grid-row-gap: ${size.mediumLarge};
    justify-content: space-between;
    @media ${screenSize.upToMedium} {
        grid-template-columns: 100%;
    }
`;

const PromoteYourself = ({ ...props }) => {
    const [activePicture, setActivePicture] = useState(null);
    const pictureInputRef = useRef();
    const openFileSelector = useCallback(
        () => pictureInputRef.current.click(),
        [pictureInputRef]
    );
    const onPictureChange = useCallback(e => {
        if (e.target.files) {
            setActivePicture(e.target.files[0]);
        }
    }, []);
    const theme = useTheme();
    const activePhotoText = !!activePicture
        ? 'Change photo'
        : 'Attach photo (to be displayed with your bio)';
    return (
        <SubmitFormFieldset
            buttonText="Submit"
            legendText="Share Details"
            {...props}
        >
            <LinksSection>
                <Input required narrow placeholder="First Name" />
                <Input required narrow placeholder="Last Name" />
                <Input
                    required
                    narrow
                    type="email"
                    placeholder="Email Address"
                />
            </LinksSection>
            <TextArea placeholder="Short Bio" />
            <ButtonWithImage onClick={openFileSelector}>
                <ButtonImage>
                    {activePicture ? (
                        <AuthorImage
                            isInternalReference={false}
                            height={IMAGE_PREVIEW_SIZE}
                            width={IMAGE_PREVIEW_SIZE}
                            image={URL.createObjectURL(activePicture)}
                        />
                    ) : (
                        <Folder
                            color={theme.colorMap.greyDarkThree}
                            height={FOLDER_SIZE}
                            width={FOLDER_SIZE}
                        />
                    )}
                </ButtonImage>
                <ButtonText collapse>{activePhotoText}</ButtonText>
            </ButtonWithImage>
            <HiddenInput
                ref={pictureInputRef}
                type="file"
                name="picture"
                accept="image/*"
                onChange={onPictureChange}
            />
            <Input required narrow placeholder="School Name" />
            <Input narrow placeholder="GitHub Page" />
            <Input narrow placeholder="Twitter" />
            <Input narrow placeholder="LinkedIn" />
            <Input narrow placeholder="Personal Website" />
        </SubmitFormFieldset>
    );
};

export default PromoteYourself;
