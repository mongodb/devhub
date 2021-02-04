import React from 'react';
import Input from '~components/dev-hub/input';
import SubmitFormFieldset from './submit-form-fieldset';

const PromoteYourself = ({ ...props }) => (
    <SubmitFormFieldset
        buttonText="Submit"
        legendText="Share Details"
        {...props}
    >
        <Input required narrow placeholder="First Name" />
        <Input required narrow placeholder="Last Name" />
        <Input required narrow type="email" placeholder="Email Address" />
        <Input required narrow placeholder="School Name" />
        <Input narrow placeholder="GitHub Page" />
        <Input narrow placeholder="Twitter" />
        <Input narrow placeholder="LinkedIn" />
        <Input narrow placeholder="Personal Website" />
    </SubmitFormFieldset>
);

export default PromoteYourself;
