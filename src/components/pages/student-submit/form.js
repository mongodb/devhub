import React from 'react';
import styled from '@emotion/styled';
import Input from '~components/dev-hub/input';
import TextArea from '~components/dev-hub/text-area';

const Fieldset = styled('fieldset')`
    border: none;
`;

const Form = () => {
    return (
        <form>
            <Fieldset>
                <Input narrow required placeholder="Project Name" />
                <Input
                    narrow
                    required
                    placeholder="Short description of project"
                />
                <Input
                    narrow
                    required
                    placeholder="Tools used (separate each tool with a comma)"
                />
                <Input narrow required placeholder="GitHub Link" />
                <Input narrow placeholder="Other project link" />
                <Input narrow placeholder="YouTube Video Demo Link" />
            </Fieldset>
            <Fieldset>
                <TextArea required placeholder="About the Project" />
                <TextArea required placeholder="Inspiration for the project" />
                <TextArea required placeholder="Why did you use MongoDB" />
                <TextArea required placeholder="How it works" />
            </Fieldset>
            <Fieldset>
                <Input required narrow placeholder="First Name" />
                <Input required narrow placeholder="Last Name" />
                <Input
                    required
                    narrow
                    type="email"
                    placeholder="Email Address"
                />
                <Input required narrow placeholder="School Name" />
                <Input narrow placeholder="GitHub Page" />
                <Input narrow placeholder="Twitter" />
                <Input narrow placeholder="LinkedIn" />
                <Input narrow placeholder="Personal Website" />
            </Fieldset>
        </form>
    );
};

export default Form;
