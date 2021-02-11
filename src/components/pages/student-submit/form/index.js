import React, { useCallback, useRef } from 'react';
import styled from '@emotion/styled';
import { size } from '~components/dev-hub/theme';
import { useStudentSpotlightReducer } from '~hooks/use-student-spotlight-reducer';
import { submitStudentSpotlightProject } from '~utils/devhub-api-stitch';
import ProjectInfo from './project-info';
import PromoteYourself from './promote-yourself';
import ShareDetails from './share-details';

const FormWithMargin = styled('form')`
    margin: ${size.xlarge} 0;
`;

const Form = () => {
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
        async (e, initialRef, nextRef) => {
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
                    const newState = { ...state };
                    const form_data = new FormData();
                    newState.project_images.forEach(img => {
                        form_data.append('files', img);
                    });
                    const r = await fetch('http://18.144.177.6:1337/upload', {
                        'Content-Type': 'multipart/form-data',
                        method: 'post',
                        body: form_data,
                    });
                    const resp = await r.json();
                    newState.project_images = resp.map(r => r._id);
                    submitStudentSpotlightProject(newState);
                }
            } else {
                // Browser method to show validity messages
                currentFieldset.form.reportValidity();
            }
        },
        [state]
    );

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
                onChange={onChange}
                state={state}
            />
            <ShareDetails
                isOpen={true}
                newRef={fieldsetTwoRef}
                onComplete={onSecondPartComplete}
                onChange={onChange}
                state={state}
            />
            <PromoteYourself
                dispatch={dispatch}
                isOpen={true}
                newRef={fieldsetThreeRef}
                onComplete={onFinalPartComplete}
                onStudentChange={onStudentChange}
                state={state}
            />
        </FormWithMargin>
    );
};

export default Form;
