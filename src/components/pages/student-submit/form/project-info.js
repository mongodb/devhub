import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import Input from '~components/dev-hub/input';
import MainImageDropzone from './main-image-dropzone';
import AdditionalImageDropzone from './additional-image-dropzone';
import SubmitFormFieldset from './submit-form-fieldset';
import { screenSize, size } from '~components/dev-hub/theme';
import { H5, P2 } from '~components/dev-hub/text';

const INPUT_BOX_WIDTH = '336px';

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
    <Input narrow required={required} {...props} />
);

const ProjectInfo = ({ state, onChange, ...props }) => {
    const onAdditionalImageDropzoneChange = useCallback(
        images => {
            onChange({
                target: {
                    name: 'additional_images',
                    value: images,
                },
            });
        },
        [onChange]
    );
    const onMainImageDropzoneChange = useCallback(
        image => {
            onChange({
                target: {
                    name: 'image',
                    value: image,
                },
            });
        },
        [onChange]
    );
    return (
        <SubmitFormFieldset
            buttonText="Next"
            legendText="Project Info"
            {...props}
        >
            <FormInput
                name="name"
                onChange={onChange}
                placeholder="Project Name"
                value={state.name}
            />
            <FormInput
                name="short_description"
                onChange={onChange}
                placeholder="Short description of project"
                value={state.short_description}
            />
            <FormInput
                name="tools_used"
                onChange={onChange}
                placeholder="Tools used (separate each tool with a comma)"
                value={state.tools_used}
            />
            <LinksSection>
                <FormInput
                    required={false}
                    name="github_url"
                    onChange={onChange}
                    placeholder="Source Code URL (GitHub)"
                    type="url"
                    value={state.github_url}
                />
                <FormInput
                    required={false}
                    name="project_link"
                    onChange={onChange}
                    placeholder="Other Project Link"
                    type="url"
                    value={state.project_link}
                />
            </LinksSection>
            <H5>Show off with images and video</H5>
            <GreyP2 collapse>Main Image</GreyP2>
            <MainImageDropzone onChange={onMainImageDropzoneChange} />
            <GreyP2 collapse>Additional Images</GreyP2>
            <AdditionalImageDropzone
                onChange={onAdditionalImageDropzoneChange}
            />
            <FormInput
                required={false}
                name="youtube_link"
                onChange={onChange}
                placeholder="YouTube Video Demo Link"
                type="url"
                value={state.youtube_link}
            />
        </SubmitFormFieldset>
    );
};

export default ProjectInfo;
