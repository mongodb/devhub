import React, { useCallback, useRef, useState } from 'react';
import styled from '@emotion/styled';
import Button from '~components/dev-hub/button';
import Input from '~components/dev-hub/input';
import TextArea from '~components/dev-hub/text-area';
import { H5 } from '~components/dev-hub/text';

const Centered = styled('div')`
    display: flex;
    justify-content: center;
`;

const H5ChangesOnClose = styled(H5)`
    ${({ isClosed, theme }) =>
        isClosed && `color: ${theme.colorMap.greyDarkOne}`};
    float: left;
    ${({ isClosed }) => isClosed && 'margin-bottom: 0'};
`;
const Legend = H5ChangesOnClose.withComponent('legend');

const Fieldset = styled('fieldset')`
    background: #0c1c27;
    border: 1px solid #21313c;
    border-radius: 8px;
    padding: 32px 48px;
    max-width: 792px;
    margin: 0 auto;
    :not(:last-of-type) {
        margin-bottom: 24px;
    }
`;

const FieldsetContent = styled('div')`
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    > * {
        margin-bottom: 24px;
    }
`;

const FormWithMargin = styled('form')`
    margin: 64px 0;
`;

const ProjectInfo = ({ isOpen, onComplete, newRef }) => (
    <Fieldset ref={newRef}>
        <Legend isClosed={!isOpen}>Project Info</Legend>
        <FieldsetContent isOpen={isOpen}>
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
            <Centered>
                <Button primary onClick={onComplete}>
                    Next
                </Button>
            </Centered>
        </FieldsetContent>
    </Fieldset>
);

const ShareDetails = ({ isOpen, onComplete, newRef }) => (
    <Fieldset isOpen={isOpen} ref={newRef}>
        <Legend isClosed={!isOpen}>Share Details</Legend>
        <FieldsetContent isOpen={isOpen}>
            <TextArea required placeholder="About the Project" />
            <TextArea required placeholder="Inspiration for the project" />
            <TextArea required placeholder="Why did you use MongoDB" />
            <TextArea required placeholder="How it works" />
            <Centered>
                <Button primary onClick={onComplete}>
                    Next
                </Button>
            </Centered>
        </FieldsetContent>
    </Fieldset>
);

const PromoteYourself = ({ isOpen, onComplete, newRef }) => (
    <Fieldset ref={newRef}>
        <Legend isClosed={!isOpen}>Promote Yourself</Legend>
        <FieldsetContent isOpen={isOpen}>
            <Input required narrow placeholder="First Name" />
            <Input required narrow placeholder="Last Name" />
            <Input required narrow type="email" placeholder="Email Address" />
            <Input required narrow placeholder="School Name" />
            <Input narrow placeholder="GitHub Page" />
            <Input narrow placeholder="Twitter" />
            <Input narrow placeholder="LinkedIn" />
            <Input narrow placeholder="Personal Website" />
            <Centered>
                <Button primary onClick={onComplete}>
                    Finish
                </Button>
            </Centered>
        </FieldsetContent>
    </Fieldset>
);

const Form = () => {
    const [fieldsetOpen, setFieldsetOpen] = useState([true, false, false]);
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
                // submit form
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
                isOpen={fieldsetOpen[0]}
                newRef={fieldsetOneRef}
                onComplete={onFirstPartComplete}
            />
            <ShareDetails
                isOpen={fieldsetOpen[1]}
                newRef={fieldsetTwoRef}
                onComplete={onSecondPartComplete}
            />
            <PromoteYourself
                isOpen={fieldsetOpen[2]}
                newRef={fieldsetThreeRef}
                onComplete={onFinalPartComplete}
            />
        </FormWithMargin>
    );
};

export default Form;
