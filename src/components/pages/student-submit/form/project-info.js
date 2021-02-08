import React from 'react';
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

const ProjectInfo = ({ ...props }) => (
    <SubmitFormFieldset buttonText="Next" legendText="Project Info" {...props}>
        <Input narrow required placeholder="Project Name" />
        <Input narrow required placeholder="Short description of project" />
        <Input
            narrow
            required
            placeholder="Tools used (separate each tool with a comma)"
        />
        <LinksSection>
            <Input narrow required placeholder="GitHub Link" />
            <Input narrow placeholder="Other project link" />
        </LinksSection>
        <H5>Show off with images and video</H5>
        <ImageDropzone />
        <Input narrow placeholder="YouTube Video Demo Link" />
    </SubmitFormFieldset>
);

export default ProjectInfo;
