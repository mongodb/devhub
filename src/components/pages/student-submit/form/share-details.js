import React from 'react';
import TextArea from '~components/dev-hub/text-area';
import SubmitFormFieldset from './submit-form-fieldset';

const RequiredTextarea = ({ ...props }) => <TextArea required {...props} />;

const ShareDetails = ({ onChange, state, ...props }) => (
    <SubmitFormFieldset buttonText="Next" legendText="Share Details" {...props}>
        <RequiredTextarea
            name="about_project"
            onChange={onChange}
            value={state.about_project}
            placeholder="About the Project"
        />
        <RequiredTextarea
            name="inspiration"
            onChange={onChange}
            value={state.inspiration}
            placeholder="Inspiration for the project"
        />
        <RequiredTextarea
            name="why_mongodb"
            onChange={onChange}
            value={state.why_mongodb}
            placeholder="Why did you use MongoDB"
        />
        <RequiredTextarea
            name="how_it_works"
            onChange={onChange}
            value={state.how_it_works}
            placeholder="How it works"
        />
    </SubmitFormFieldset>
);

export default ShareDetails;
