import React, { useCallback, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { size } from '~components/dev-hub/theme';
import { useStudentSpotlightReducer } from '~hooks/use-student-spotlight-reducer';
import ProjectInfo from './project-info';
import PromoteYourself from './promote-yourself';
import ShareDetails from './share-details';

const FormWithMargin = styled('form')`
    margin: ${size.xlarge} 0;
`;

const Form = () => {
    const [fieldsetsOpen, setFieldsetsOpen] = useState([true, false, false]);
    const [state, dispatch] = useStudentSpotlightReducer();
    const fieldsetOneRef = useRef();
    const fieldsetTwoRef = useRef();
    const fieldsetThreeRef = useRef();

    const scrollToRef = ref =>
        window.scrollTo({ behavior: 'smooth', top: ref.current.offsetTop });

    const onChange = useCallback(
        e => dispatch({ field: e.target.name, value: e.target.value }),
        [dispatch]
    );

    const onStudentChange = i => e =>
        dispatch({ field: e.target.name, student: i, value: e.target.value });

    const onFormPartCompletion = useCallback(
        (e, i, initialRef, nextRef) => {
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
                    const newOpen = [...fieldsetsOpen];
                    newOpen[i] = false;
                    newOpen[i + 1] = true;
                    setFieldsetsOpen(newOpen);
                    scrollToRef(nextRef);
                } else {
                    // TODO: this is the last part, submit form
                    return;
                }
            } else {
                // Browser method to show validity messages
                currentFieldset.form.reportValidity();
            }
        },
        [fieldsetsOpen]
    );

    const onFirstPartComplete = useCallback(
        e => onFormPartCompletion(e, 0, fieldsetOneRef, fieldsetTwoRef),
        [fieldsetOneRef, fieldsetTwoRef, onFormPartCompletion]
    );
    const onSecondPartComplete = useCallback(
        e => onFormPartCompletion(e, 1, fieldsetTwoRef, fieldsetThreeRef),
        [fieldsetThreeRef, fieldsetTwoRef, onFormPartCompletion]
    );
    const onFinalPartComplete = useCallback(
        e => onFormPartCompletion(e, 2, fieldsetThreeRef),
        [fieldsetThreeRef, onFormPartCompletion]
    );

    return (
        <FormWithMargin>
            <ProjectInfo
                isOpen={fieldsetsOpen[0]}
                newRef={fieldsetOneRef}
                onComplete={onFirstPartComplete}
                onChange={onChange}
                state={state}
            />
            <ShareDetails
                isOpen={fieldsetsOpen[1]}
                newRef={fieldsetTwoRef}
                onComplete={onSecondPartComplete}
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
        </FormWithMargin>
    );
};

export default Form;
