import React, { useCallback, useRef, useState } from 'react';
import styled from '@emotion/styled';
import Button from '~components/dev-hub/button';
import Input from '~components/dev-hub/input';
import TextArea from '~components/dev-hub/text-area';
import { H5 } from '~components/dev-hub/text';

const H5ChangesOnClose = styled(H5)`
    ${({ isClosed, theme }) =>
        isClosed && `color: ${theme.colorMap.greyDarkOne}`};
`;
const Legend = H5ChangesOnClose.withComponent('legend');

const Fieldset = styled('fieldset')`
    border: none;
    > * {
        margin-bottom: 24px;
    }
`;

const FieldsetContent = styled('div')`
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const ProjectInfo = ({ isOpen, onComplete, newRef }) => {
    return (
        <Fieldset ref={newRef}>
            <Legend isClosed={!isOpen}>Project Info</Legend>
            <FieldsetContent isOpen={isOpen}>
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
                <Button primary onClick={onComplete}>
                    Next
                </Button>
            </FieldsetContent>
        </Fieldset>
    );
};

const ShareDetails = ({ isOpen, onComplete, newRef }) => {
    return (
        <Fieldset isOpen={isOpen} ref={newRef}>
            <Legend isClosed={!isOpen}>Share Details</Legend>
            <FieldsetContent isOpen={isOpen}>
                <TextArea required placeholder="About the Project" />
                <TextArea required placeholder="Inspiration for the project" />
                <TextArea required placeholder="Why did you use MongoDB" />
                <TextArea required placeholder="How it works" />
                <Button primary onClick={onComplete}>
                    Next
                </Button>
            </FieldsetContent>
        </Fieldset>
    );
};

const PromoteYourself = ({ isOpen, onComplete, newRef }) => {
    return (
        <Fieldset ref={newRef}>
            <Legend isClosed={!isOpen}>Promote Yourself</Legend>
            <FieldsetContent isOpen={isOpen}>
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
                <Button primary onClick={onComplete}>
                    Finish
                </Button>
            </FieldsetContent>
        </Fieldset>
    );
};

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
        <form>
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
        </form>
    );
};

export default Form;
