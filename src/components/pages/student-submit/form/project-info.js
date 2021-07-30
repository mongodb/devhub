import React, { useCallback } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Input from '~components/dev-hub/input';
import MainImageDropzone from './main-image-dropzone';
import AdditionalImageDropzone from './additional-image-dropzone';
import SubmitFormFieldset from './submit-form-fieldset';
import { screenSize, size } from '~components/dev-hub/theme';
import { H5, P2 } from '~components/dev-hub/text';

const INPUT_BOX_WIDTH = '336px';

const reopenStyling = css`
    cursor: pointer;
`;

const ReopenController = styled('div')`
    ${({ canReopen }) => canReopen && reopenStyling}
`;

const GreyP2 = styled(P2)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
`;

const LinksSection = styled('div')`
    display: grid;
    grid-template-columns: repeat(auto-fill, ${INPUT_BOX_WIDTH});
    grid-row-gap: ${size.mediumLarge};
    justify-content: space-between;
    margin-bottom: ${size.xlarge};
    @media ${screenSize.upToLarge} {
        grid-template-columns: 100%;
        margin-bottom: ${size.large};
    }
`;

const FormInput = ({ required = true, ...props }) => (
    <Input required={required} {...props} />
);

const ProjectInfo = ({ canReopen, state, onChange, onClick, ...props }) => {
    const onImageChange = useCallback(
        (name, images) => {
            onChange({
                target: {
                    name: name,
                    value: images,
                },
            });
        },
        [onChange]
    );
    const onAdditionalImageChange = useCallback(
        images => onImageChange('additional_images', images),
        [onImageChange]
    );
    const onMainImageChange = useCallback(
        images => onImageChange('image', images),
        [onImageChange]
    );
    return (
        <ReopenController canReopen={canReopen} onClick={onClick}>
            <SubmitFormFieldset
                buttonText="Next"
                legendText="Project Info"
                {...props}
            >
                <FormInput
                    name="name"
                    onChange={onChange}
                    label="Project Name"
                    value={state.name}
                />
                <FormInput
                    name="short_description"
                    onChange={onChange}
                    label="Short description of project"
                    value={state.short_description}
                />
                <FormInput
                    name="tools_used"
                    onChange={onChange}
                    label="Tools used (separate each tool with a comma)"
                    value={state.tools_used}
                />
                <LinksSection>
                    <FormInput
                        required={false}
                        name="github_url"
                        onChange={onChange}
                        label="Source Code URL (GitHub)"
                        type="url"
                        value={state.github_url}
                    />
                    <FormInput
                        required={false}
                        name="project_link"
                        onChange={onChange}
                        label="Other Project Link"
                        type="url"
                        value={state.project_link}
                    />
                </LinksSection>
                <H5>Show off with images and video</H5>
                <GreyP2 collapse>Main Image</GreyP2>
                <MainImageDropzone onChange={onMainImageChange} />
                <GreyP2 collapse>Additional Images</GreyP2>
                <AdditionalImageDropzone onChange={onAdditionalImageChange} />
                <FormInput
                    required={false}
                    name="youtube_link"
                    onChange={onChange}
                    label="YouTube Video Demo Link"
                    type="url"
                    value={state.youtube_link}
                />
            </SubmitFormFieldset>
        </ReopenController>
    );
};

export default ProjectInfo;
