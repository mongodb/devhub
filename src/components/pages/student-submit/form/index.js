import React, { useCallback, useRef, useState } from 'react';
import dlv from 'dlv';
import styled from '@emotion/styled';
import { size } from '~components/dev-hub/theme';
import { useStudentSpotlightReducer } from '~hooks/use-student-spotlight-reducer';
import { submitStudentSpotlightProject } from '~utils/devhub-api-stitch';
import ProjectInfo from './project-info';
import PromoteYourself from './promote-yourself';
import ShareDetails from './share-details';
import SuccessState from '~components/dev-hub/success-state';
import { H3, P2 } from '~components/dev-hub/text';
import Modal from '~src/components/dev-hub/modal';

const FormWithMargin = styled('form')`
    margin: ${size.xlarge} 0;
`;

const uploadImagesToStrapi = async images => {
    const form_data = new FormData();
    images.forEach(img => {
        form_data.append('files', img);
    });
    const r = await fetch(`${process.env.STRAPI_URL}/upload`, {
        'Content-Type': 'multipart/form-data',
        method: 'post',
        body: form_data,
    });
    const resp = await r.json();
    try {
        return { success: true, data: resp.map(r => r._id) };
    } catch (e) {
        // Something failed in image upload
        const errorMsg = dlv(
            resp,
            'data.errors.0.message',
            'An unknown error occurred'
        );
        return { success: false, data: `${resp.error} ${errorMsg}` };
    }
};

const Form = () => {
    const [success, setSuccess] = useState(true);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
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
                    setError(null);
                    const newState = { ...state };
                    setIsSubmitting(true);
                    // Try project image upload
                    const {
                        success: projImageSuccess,
                        data: projImageData,
                    } = await uploadImagesToStrapi(newState.project_images);
                    if (!projImageSuccess) {
                        setError(projImageData);
                        setIsSubmitting(false);
                        return;
                    }
                    newState.project_images = projImageData;
                    // Try student images upload
                    const studentImages = newState.students.map(s => s.image);
                    const {
                        success: studentImageSuccess,
                        data: studentImageData,
                    } = await uploadImagesToStrapi(studentImages);
                    if (!studentImageSuccess) {
                        setError(studentImageData);
                        setIsSubmitting(false);
                        return;
                    }
                    studentImageData.forEach((id, i) => {
                        newState.students[i].image = id;
                    });
                    const {
                        success,
                        message,
                    } = await submitStudentSpotlightProject(newState);
                    setIsSubmitting(false);
                    if (success) {
                        setSuccess(true);
                    } else {
                        setError(message);
                        console.error(message);
                    }
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
            {error && (
                <Modal
                    verticallyCenter
                    isOpenToStart={true}
                    dialogContainerStyle={{
                        maxWidth: '600px',
                        padding: `0 ${size.large}`,
                    }}
                >
                    <H3>Error: {error}</H3>
                    <P2>
                        Please try submitting again. If this persists please
                        email academia@mongodb.com.
                    </P2>
                </Modal>
            )}
            {isSubmitting && (
                <Modal
                    verticallyCenter
                    isOpenToStart={true}
                    dialogContainerStyle={{
                        maxWidth: '600px',
                        padding: `0 ${size.large}`,
                    }}
                >
                    <H3>Submitting...</H3>
                </Modal>
            )}
            {success && (
                <Modal
                    verticallyCenter
                    isOpenToStart={true}
                    dialogContainerStyle={{
                        maxWidth: '600px',
                        padding: `0 ${size.large}`,
                    }}
                >
                    <SuccessState>
                        <H3>Thank you for sharing!</H3>
                        <P2>
                            We’re looking forward to reading about your project.
                            We will review your submission and will send you an
                            email once it’s added to the page, stay tuned!
                        </P2>
                    </SuccessState>
                </Modal>
            )}
        </FormWithMargin>
    );
};

export default Form;
