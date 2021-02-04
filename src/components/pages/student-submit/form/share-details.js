import React from 'react';
import TextArea from '~components/dev-hub/text-area';
import SubmitFormFieldset from './submit-form-fieldset';

const ShareDetails = ({ ...props }) => (
    <SubmitFormFieldset buttonText="Next" legendText="Share Details" {...props}>
        <TextArea required placeholder="About the Project" />
        <TextArea required placeholder="Inspiration for the project" />
        <TextArea required placeholder="Why did you use MongoDB" />
        <TextArea required placeholder="How it works" />
    </SubmitFormFieldset>
);

export default ShareDetails;
