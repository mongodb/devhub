import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useTheme } from 'emotion-theming';
import AuthorImage from '~components/dev-hub/author-image';
import Input from '~components/dev-hub/input';
import TextArea from '~components/dev-hub/text-area';
import SubmitFormFieldset from './submit-form-fieldset';
import styled from '@emotion/styled';
import { layer, screenSize, size } from '~components/dev-hub/theme';
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
    position: relative;
`;

const ButtonImage = styled('div')`
    padding-right: 12px;
`;

const HiddenInput = styled('input')`
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: ${layer.superBack};
`;

const HiddenInputContainer = styled('div')`
    position: relative;
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

const FormInput = ({ required = true, ...props }) => (
    <Input narrow required={required} {...props} />
);

const PromoteYourself = ({ onChange, state, ...props }) => {
    const [activePicture, setActivePicture] = useState(null);
    const hasActivePicture = !!activePicture;
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
    const authorImage = useMemo(
        () => hasActivePicture && URL.createObjectURL(activePicture),
        [activePicture, hasActivePicture]
    );
    const theme = useTheme();
    const activePhotoText = hasActivePicture
        ? 'Change photo'
        : 'Attach photo (to be displayed with your bio)';
    return (
        <SubmitFormFieldset
            buttonText="Submit"
            legendText="Share Details"
            {...props}
        >
            <LinksSection>
                <FormInput
                    name="first_name"
                    onChange={onChange}
                    value={state.first_name}
                    placeholder="First Name"
                />
                <FormInput
                    name="last_name"
                    onChange={onChange}
                    value={state.last_name}
                    placeholder="Last Name"
                />
                <FormInput
                    name="email"
                    onChange={onChange}
                    value={state.email}
                    type="email"
                    placeholder="Email Address"
                />
            </LinksSection>
            <TextArea
                name="short_bio"
                onChange={onChange}
                value={state.short_bio}
                placeholder="Short Bio"
            />
            <HiddenInputContainer>
                <ButtonWithImage onClick={openFileSelector}>
                    <ButtonImage>
                        {activePicture ? (
                            <AuthorImage
                                isInternalReference={false}
                                height={IMAGE_PREVIEW_SIZE}
                                width={IMAGE_PREVIEW_SIZE}
                                image={authorImage}
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
                    tabIndex="-1"
                    required
                    name="picture"
                    accept="image/*"
                    onChange={onPictureChange}
                />
            </HiddenInputContainer>
            <FormInput
                name="school_name"
                onChange={onChange}
                value={state.school_name}
                placeholder="School Name"
            />
            <FormInput
                name="github_page"
                onChange={onChange}
                value={state.github_page}
                required={false}
                placeholder="GitHub Page"
            />
            <FormInput
                name="twitter"
                onChange={onChange}
                value={state.twitter}
                required={false}
                placeholder="Twitter"
            />
            <FormInput
                name="linkedin"
                onChange={onChange}
                value={state.linkedin}
                required={false}
                placeholder="LinkedIn"
            />
            <FormInput
                name="personal_website"
                onChange={onChange}
                value={state.personal_website}
                required={false}
                placeholder="Personal Website"
            />
        </SubmitFormFieldset>
    );
};

export default PromoteYourself;
