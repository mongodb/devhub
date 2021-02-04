import React from 'react';
import Input from '~components/dev-hub/input';
import SubmitFormFieldset from './submit-form-fieldset';

const ProjectInfo = ({ ...props }) => (
    <SubmitFormFieldset buttonText="Next" legendText="Project Info" {...props}>
        <Input narrow required placeholder="Project Name" />
        <Input narrow required placeholder="Short description of project" />
        <Input
            narrow
            required
            placeholder="Tools used (separate each tool with a comma)"
        />
        <Input narrow required placeholder="GitHub Link" />
        <Input narrow placeholder="Other project link" />
        <Input narrow placeholder="YouTube Video Demo Link" />
    </SubmitFormFieldset>
);

export default ProjectInfo;
