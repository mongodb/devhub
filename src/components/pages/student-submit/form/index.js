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
        const currentFieldset = initialRef.current;
        const fieldsetElements = Array.from(currentFieldset.elements);
        // Last entry of fieldset is the button to move on to the next fieldset
        // We do not need to consider it when checking validity
        fieldsetElements.pop();
        const isValid = fieldsetElements.reduce(
            (p, c) => p && c.checkValidity(),
            true
        );
        if (isValid) {
            if (nextRef) {
                scrollToRef(nextRef);
            } else {
                // TODO: this is the last part, submit form
                return;
            }
        } else {
            // Browser method to show validity messages
            currentFieldset.form.reportValidity();
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
