import React, { useCallback, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { size } from '~components/dev-hub/theme';
import { useStudentSpotlightReducer } from '~hooks/use-student-spotlight-reducer';
import ProjectInfo from './project-info';
import PromoteYourself from './promote-yourself';
import ShareDetails from './share-details';
import { onStudentSpotlightFormSubmission } from '~utils/on-student-spotlight-form-submission';
import FormErrorModal from './form-error-modal';
import FormSubmittingModal from './form-submitting-modal';
import FormSuccessModal from './form-success-modal';
import { screenSize } from '~components/dev-hub/theme';

const FormWithMargin = styled('form')`
    margin: ${size.xlarge} 0;
    @media ${screenSize.upToLarge} {
        margin-bottom: 48px;
    }
    > :not(:last-child) {
        margin-bottom: ${size.mediumLarge};
        @media ${screenSize.upToLarge} {
            margin-bottom: ${size.default};
        }
    }
`;

const Form = () => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fieldsetsOpen, setFieldsetsOpen] = useState([true, false, false]);
    const [state, dispatch] = useStudentSpotlightReducer();
    const fieldsetOneRef = useRef();
    const fieldsetTwoRef = useRef();
    const fieldsetThreeRef = useRef();

    const currentFieldsetIndex = useMemo(
        () => fieldsetsOpen.lastIndexOf(true),
        [fieldsetsOpen]
    );

    const scrollToRef = ref =>
        window.scrollTo({ behavior: 'smooth', top: ref.current.offsetTop });

    const onChange = useCallback(
        e => dispatch({ field: e.target.name, value: e.target.value }),
        [dispatch]
    );

    const onStudentChange = useCallback(
        i => e =>
            dispatch({
                field: e.target.name,
                student: i,
                value: e.target.value,
            }),
        [dispatch]
    );

    const onReopen = useCallback(
        i => () => {
            if (i < currentFieldsetIndex) {
                // Open this one and close all other ones
                const newOpen = fieldsetsOpen.map((_, idx) => idx === i);
                setFieldsetsOpen(newOpen);
            }
        },
        [currentFieldsetIndex, fieldsetsOpen]
    );

    const onFormPartCompletion = useCallback(
        async (e, i, ref, isFinalPart = false) => {
            e.preventDefault();
            const currentFieldset = ref.current;
            const fieldsetElements = Array.from(currentFieldset.elements);
            const isValid = fieldsetElements.reduce(
                (p, c) => p && c.checkValidity(),
                true
            );
            if (isValid) {
                if (isFinalPart) {
                    await onStudentSpotlightFormSubmission(
                        state,
                        setError,
                        setIsSubmitting,
                        setSuccess
                    );
                } else {
                    const newOpen = [...fieldsetsOpen];
                    newOpen[i] = false;
                    newOpen[i + 1] = true;
                    setFieldsetsOpen(newOpen);
                    scrollToRef(ref);
                }
            } else {
                // Browser method to show validity messages
                currentFieldset.form.reportValidity();
            }
        },
        [fieldsetsOpen, state]
    );

    const onFirstPartComplete = useCallback(
        e => onFormPartCompletion(e, 0, fieldsetOneRef),
        [fieldsetOneRef, onFormPartCompletion]
    );
    const onSecondPartComplete = useCallback(
        e => onFormPartCompletion(e, 1, fieldsetTwoRef),
        [fieldsetTwoRef, onFormPartCompletion]
    );
    const onFinalPartComplete = useCallback(
        e => onFormPartCompletion(e, 2, fieldsetThreeRef, true),
        [fieldsetThreeRef, onFormPartCompletion]
    );

    return (
        <FormWithMargin>
            <ProjectInfo
                canReopen={0 < currentFieldsetIndex}
                isOpen={fieldsetsOpen[0]}
                newRef={fieldsetOneRef}
                onClick={onReopen(0)}
                onChange={onChange}
                onComplete={onFirstPartComplete}
                state={state}
            />
            <ShareDetails
                canReopen={1 < currentFieldsetIndex}
                isOpen={fieldsetsOpen[1]}
                newRef={fieldsetTwoRef}
                onComplete={onSecondPartComplete}
                onClick={onReopen(1)}
                onChange={onChange}
                state={state}
            />
            <PromoteYourself
                dispatch={dispatch}
                isOpen={fieldsetsOpen[2]}
                newRef={fieldsetThreeRef}
                onComplete={onFinalPartComplete}
                onStudentChange={onStudentChange}
                state={state}
            />
            {error && <FormErrorModal error={error} />}
            {isSubmitting && <FormSubmittingModal />}
            {success && <FormSuccessModal />}
        </FormWithMargin>
    );
};

export default Form;
