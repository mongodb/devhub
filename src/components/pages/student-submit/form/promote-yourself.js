import React, { useCallback, useMemo, useState } from 'react';
import Button from '~components/dev-hub/button';
import SubmitFormFieldset from './submit-form-fieldset';
import CondensedStudentEntry from './condensed-student-entry';
import NewStudentFieldset from './new-student-fieldset';

const SingleStudentFieldset = ({
    isExpanded,
    onChange,
    onEdit,
    onRemove,
    state,
}) => {
    const [activePicture, setActivePicture] = useState(null);
    const hasActivePicture = !!activePicture;

    const authorImage = useMemo(
        () => hasActivePicture && URL.createObjectURL(activePicture),
        [activePicture, hasActivePicture]
    );

    return isExpanded ? (
        <NewStudentFieldset
            authorImage={authorImage}
            setActivePicture={setActivePicture}
            onChange={onChange}
            state={state}
        />
    ) : (
        <CondensedStudentEntry
            authorImage={authorImage}
            state={state}
            onEdit={onEdit}
            onRemove={onRemove}
        />
    );
};

const isEmpty = student => {
    const keys = Object.keys(student);
    const searchKeys = keys.filter(k => !['key', 'isExpanded'].includes(k));
    return searchKeys.reduce((p, c) => p && !student[c], true);
};

const PromoteYourself = ({
    dispatch,
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
    const updateStudents = useCallback(
        value => dispatch({ field: 'students', value }),
        [dispatch]
    );
    const addNewStudent = useCallback(() => {
        if (props.newRef.current.form.checkValidity()) {
            // Whenever we add a student, increment the total to ensure a unique key
            setNumStudents(numStudents + 1);
            const newStudents = state.students.map(s => ({
                ...s,
                isExpanded: false,
            }));

            newStudents.push({ key: numStudents, isExpanded: true });
            updateStudents(newStudents);
        } else {
            props.newRef.current.form.reportValidity();
        }
    }, [props.newRef, numStudents, state, updateStudents]);
    const editStudent = useCallback(
        i => () => {
            // if last student is empty, remove
            const lastStudent = state.students[state.students.length - 1];
            const newStudents = [...state.students];
            if (isEmpty(lastStudent)) {
                newStudents.splice(-1);
            }
            const result = newStudents.map((s, idx) => ({
                ...s,
                isExpanded: i === idx ? true : false,
            }));
            updateStudents(result);
            // else validate then open at i
        },
        [state.students, updateStudents]
    );
    const removeStudent = useCallback(
        i => () => {
            const newStudents = [...state.students];
            newStudents.splice(i, 1);
            updateStudents(newStudents);
        },
        [state.students, updateStudents]
    );

    const onStudentFormComplete = useCallback(
        e => {
            const lastStudent = state.students[state.students.length - 1];
            if (isEmpty(lastStudent)) {
                const newStudents = [...state.students];
                newStudents.splice(-1);
                updateStudents(newStudents);
            }
            onComplete(e);
        },
        [onComplete, state.students, updateStudents]
    );
    return (
        <SubmitFormFieldset
            buttonText="Submit"
            legendText="Promote Yourself"
            onComplete={onStudentFormComplete}
            {...props}
        >
            {state.students.map((s, i) => (
                <SingleStudentFieldset
                    addNewStudent={addNewStudent}
                    onEdit={editStudent(i)}
                    isExpanded={s.isExpanded}
                    key={s.key}
                    onChange={onStudentChange(i)}
                    onRemove={removeStudent(i)}
                    state={s}
                />
            ))}
            <Button onClick={addNewStudent}>+ Add another team member</Button>
        </SubmitFormFieldset>
    );
};

export default PromoteYourself;
