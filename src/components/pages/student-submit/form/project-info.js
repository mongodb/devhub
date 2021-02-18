import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import Input from '~components/dev-hub/input';
import ImageDropzone from './image-dropzone';
import SubmitFormFieldset from './submit-form-fieldset';
import { screenSize, size } from '~components/dev-hub/theme';
import { H5 } from '~components/dev-hub/text';

const INPUT_BOX_WIDTH = '336px';

const LinksSection = styled('div')`
    display: grid;
    grid-template-columns: repeat(auto-fill, ${INPUT_BOX_WIDTH});
    grid-row-gap: ${size.mediumLarge};
    justify-content: space-between;
    margin-bottom: ${size.xlarge};
    @media ${screenSize.upToMedium} {
        grid-template-columns: 100%;
    }
`;

const FormInput = ({ required = true, ...props }) => (
    <Input narrow required={required} {...props} />
);

const ProjectInfo = ({ state, onChange, ...props }) => {
    const onImageDropzoneChange = useCallback(
        images => {
            onChange({
                target: {
                    name: 'project_images',
                    value: images,
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
            <ImageDropzone onChange={onImageDropzoneChange} />
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
