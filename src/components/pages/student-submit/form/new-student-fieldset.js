import React, { useCallback, useRef } from 'react';
import styled from '@emotion/styled';
import { useTheme } from 'emotion-theming';
import AuthorImage from '~components/dev-hub/author-image';
import Button from '~components/dev-hub/button';
import Folder from '~components/dev-hub/icons/folder';
import Input from '~components/dev-hub/input';
import { P3 } from '~components/dev-hub/text';
import TextArea from '~components/dev-hub/text-area';
import { layer, screenSize, size } from '~components/dev-hub/theme';

const FOLDER_SIZE = '21px';
const IMAGE_PREVIEW_SIZE = 36;
const INPUT_BOX_WIDTH = '336px';

const ButtonText = styled(P3)`
    text-decoration: none;
`;

const ButtonWithImage = styled(Button)`
    align-items: center;
    color: ${({ theme }) => theme.colorMap.devWhite};
    display: flex;
    padding: 0;
    position: relative;
    text-decoration: none;
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

const NewStudentFieldset = ({
    authorImage,
    onChange,
    setActivePicture,
    state,
}) => {
    const hasActivePicture = !!authorImage;
    const pictureInputRef = useRef();
    const theme = useTheme();
    const activePhotoText = hasActivePicture
        ? 'Change photo'
        : 'Attach photo (to be displayed with your bio)';
    const openFileSelector = useCallback(
        () => pictureInputRef.current.click(),
        [pictureInputRef]
    );
    const onPictureChange = useCallback(
        e => {
            if (e.target.files) {
                onChange({
                    target: { name: 'image', value: e.target.files[0] },
                });
                setActivePicture(e.target.files[0]);
            } else {
                onChange({
                    target: { name: 'image', value: null },
                });
            }
        },
        [onChange, setActivePicture]
    );
    return (
        <>
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
                name="bio"
                onChange={onChange}
                value={state.bio}
                placeholder="Short Bio"
            />
            <HiddenInputContainer>
                <ButtonWithImage onClick={openFileSelector}>
                    <ButtonImage>
                        {hasActivePicture ? (
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
                    name="image"
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
                name="github_url"
                onChange={onChange}
                value={state.github_url}
                required={false}
                placeholder="GitHub Page"
            />
            <FormInput
                name="twitter_handle"
                onChange={onChange}
                value={state.twitter_handle}
                required={false}
                placeholder="Twitter"
            />
            <FormInput
                name="linkedin_url"
                onChange={onChange}
                value={state.linkedin_url}
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
        </>
    );
};

export default NewStudentFieldset;
