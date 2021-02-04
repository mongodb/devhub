import React, { useCallback, useRef } from 'react';
import styled from '@emotion/styled';
import Input from '~components/dev-hub/input';
import TextArea from '~components/dev-hub/text-area';
import SubmitFormFieldset from './submit-form-fieldset';

const FormWithMargin = styled('form')`
    margin: 64px 0;
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
        <Input narrow required placeholder="GitHub Link" />
        <Input narrow placeholder="Other project link" />
        <Input narrow placeholder="YouTube Video Demo Link" />
    </SubmitFormFieldset>
);

const ShareDetails = ({ ...props }) => (
    <SubmitFormFieldset buttonText="Next" legendText="Share Details" {...props}>
        <TextArea required placeholder="About the Project" />
        <TextArea required placeholder="Inspiration for the project" />
        <TextArea required placeholder="Why did you use MongoDB" />
        <TextArea required placeholder="How it works" />
    </SubmitFormFieldset>
);

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

const Form = () => {
    const fieldsetOneRef = useRef();
    const fieldsetTwoRef = useRef();
    const fieldsetThreeRef = useRef();

    const scrollToRef = ref =>
        window.scrollTo({ behavior: 'smooth', top: ref.current.offsetTop });

    const onFormPartCompletion = useCallback((e, initialRef, nextRef) => {
        e.preventDefault();
        // Below checks entire form, should just check fieldset ideally
        const fieldsetForm = initialRef.current.form;
        const isValid = fieldsetForm.checkValidity();
        if (isValid) {
            if (nextRef) {
                scrollToRef(nextRef);
            } else {
                // TODO: this is the last part, submit form
                return;
            }
        } else {
            fieldsetForm.reportValidity();
        }
    }, []);

    const onFirstPartComplete = useCallback(
        e => onFormPartCompletion(e, fieldsetOneRef, fieldsetTwoRef),
        [fieldsetOneRef, fieldsetTwoRef, onFormPartCompletion]
    );
    const onSecondPartComplete = useCallback(
        e => onFormPartCompletion(e, fieldsetTwoRef, fieldsetThreeRef),
        [fieldsetThreeRef, fieldsetTwoRef, onFormPartCompletion]
    );
    const onFinalPartComplete = useCallback(
        e => onFormPartCompletion(e, fieldsetThreeRef),
        [fieldsetThreeRef, onFormPartCompletion]
    );

    return (
        <FormWithMargin>
            <ProjectInfo
                isOpen={true}
                newRef={fieldsetOneRef}
                onComplete={onFirstPartComplete}
            />
            <ShareDetails
                isOpen={true}
                newRef={fieldsetTwoRef}
                onComplete={onSecondPartComplete}
            />
            <PromoteYourself
                isOpen={true}
                newRef={fieldsetThreeRef}
                onComplete={onFinalPartComplete}
            />
        </FormWithMargin>
    );
};

export default Form;
