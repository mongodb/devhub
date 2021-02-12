import React, { useCallback, useRef, useState } from 'react';
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

    const onStudentChange = useCallback(
        i => e =>
            dispatch({
                field: e.target.name,
                student: i,
                value: e.target.value,
            }),
        [dispatch]
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
