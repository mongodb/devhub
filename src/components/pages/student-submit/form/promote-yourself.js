import React, { useCallback, useState } from 'react';
import { STUDENT_DEFAULT_KEYS } from '~utils/student-spotlight-reducer';
import styled from '@emotion/styled';
import Button from '~components/dev-hub/button';
import { screenSize } from '~components/dev-hub/theme';
import SingleStudentFieldset from './single-student-fieldset';
import SubmitFormFieldset from './submit-form-fieldset';

const getRemoveStudentMsg = name => `Remove ${name} from project?`;
const wantsToRemoveStudent = student =>
    window.confirm(getRemoveStudentMsg(student.first_name));

const CustomAligned = styled('div')`
    display: flex;
    justify-content: flex-end;
    @media ${screenSize.upToLarge} {
        justify-content: center;
    }
`;

const isEmpty = student => {
    const keys = Object.keys(student);
    const searchKeys = keys.filter(k => !STUDENT_DEFAULT_KEYS.includes(k));
    return searchKeys.reduce((p, c) => p && !student[c], true);
};

const PromoteYourself = ({
    dispatch,
    newRef,
    onComplete,
    onStudentChange,
    state,
    ...props
}) => {
    /* 
        We need to track the number of students to provide a unique key since
        we allow for students to be added or removed
    */
    const [numStudents, setNumStudents] = useState(1);
    const scrollToTopOfSection = useCallback(
        () =>
            window.scrollTo({
                behavior: 'smooth',
                top: newRef.current.offsetTop,
            }),
        [newRef]
    );
    const updateStudents = useCallback(
        value => dispatch({ field: 'students', value }),
        [dispatch]
    );
    const removeLastStudentIfEmpty = useCallback(() => {
        // Don't allow an empty submission
        if (state.students.length === 1) {
            return [...state.students];
        }
        const lastStudent = state.students[state.students.length - 1];
        const newStudents = [...state.students];
        if (isEmpty(lastStudent)) {
            newStudents.splice(-1);
        }
        return newStudents;
    }, [state.students]);
    const addNewStudent = useCallback(() => {
        const form = newRef.current.form;
        if (form.checkValidity()) {
            // Whenever we add a student, increment the total to ensure a unique key
            setNumStudents(numStudents + 1);
            const newStudents = state.students.map(s => ({
                ...s,
                isExpanded: false,
            }));

            newStudents.push({ key: numStudents, isExpanded: true });
            updateStudents(newStudents);
            scrollToTopOfSection();
        } else {
            form.reportValidity();
        }
    }, [
        newRef,
        numStudents,
        scrollToTopOfSection,
        state.students,
        updateStudents,
    ]);
    const editStudent = useCallback(
        i => () => {
            const newStudents = removeLastStudentIfEmpty();
            // Close all entries except this one
            const result = newStudents.map((s, idx) => ({
                ...s,
                isExpanded: i === idx,
            }));
            updateStudents(result);
        },
        [removeLastStudentIfEmpty, updateStudents]
    );
    const removeStudent = useCallback(
        i => () => {
            if (wantsToRemoveStudent(state.students[i])) {
                const newStudents = [...state.students];
                newStudents.splice(i, 1);
                updateStudents(newStudents);
            }
        },
        [state.students, updateStudents]
    );

    const onStudentFormComplete = useCallback(
        e => {
            const newStudents = removeLastStudentIfEmpty();
            updateStudents(newStudents);
            onComplete(e);
        },
        [onComplete, removeLastStudentIfEmpty, updateStudents]
    );
    return (
        <SubmitFormFieldset
            buttonText="Submit"
            legendText="Promote Yourself"
            newRef={newRef}
            onComplete={onStudentFormComplete}
            {...props}
        >
            {state.students.map((s, i) => (
                <SingleStudentFieldset
                    onEdit={editStudent(i)}
                    isExpanded={s.isExpanded}
                    key={s.key}
                    onChange={onStudentChange(i)}
                    onRemove={removeStudent(i)}
                    state={s}
                />
            ))}
            <CustomAligned>
                <Button onClick={addNewStudent}>
                    + Add another team member
                </Button>
            </CustomAligned>
        </SubmitFormFieldset>
    );
};

export default PromoteYourself;
