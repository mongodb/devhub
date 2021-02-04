import React, { useCallback, useRef } from 'react';
import styled from '@emotion/styled';
import { size } from '~components/dev-hub/theme';
import ProjectInfo from './project-info';
import PromoteYourself from './promote-yourself';
import ShareDetails from './share-details';

const FormWithMargin = styled('form')`
    margin: ${size.xlarge} 0;
`;

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
