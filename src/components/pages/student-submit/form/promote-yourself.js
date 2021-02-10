import React, { useCallback, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import SubmitFormFieldset from './submit-form-fieldset';
import CondensedStudentEntry from './condensed-student-entry';
import NewStudentFieldset from './new-student-fieldset';

const SingleStudentFieldset = ({
    addNewStudent,
    onChange,
    onRemove,
    state,
}) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [activePicture, setActivePicture] = useState(null);
    const hasActivePicture = !!activePicture;

    const authorImage = useMemo(
        () => hasActivePicture && URL.createObjectURL(activePicture),
        [activePicture, hasActivePicture]
    );
    const onAddTeamMember = useCallback(() => {
        setIsExpanded(false);
        addNewStudent();
    }, [addNewStudent]);

    return isExpanded ? (
        <NewStudentFieldset
            authorImage={authorImage}
            setActivePicture={setActivePicture}
            onAddTeamMember={onAddTeamMember}
            onChange={onChange}
            state={state}
        />
    ) : (
        <CondensedStudentEntry
            authorImage={authorImage}
            state={state}
            onRemove={onRemove}
        />
    );
};

const PromoteYourself = ({ dispatch, onStudentChange, state, ...props }) => {
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
        // Whenever we add a student, increment the total to ensure a unique key
        setNumStudents(numStudents + 1);
        updateStudents([...state.students, { key: numStudents }]);
    }, [numStudents, state.students, updateStudents]);
    const removeStudent = useCallback(
        i => () => {
            const newStudents = [...state.students];
            newStudents.splice(i, 1);
            updateStudents(newStudents);
        },
        [state.students, updateStudents]
    );
    return (
        <SubmitFormFieldset
            buttonText="Submit"
            legendText="Share Details"
            {...props}
        >
            {state.students.map((s, i) => (
                <SingleStudentFieldset
                    addNewStudent={addNewStudent}
                    key={s.key}
                    onChange={onStudentChange(i)}
                    onRemove={removeStudent(i)}
                    state={s}
                />
            ))}
        </SubmitFormFieldset>
    );
};

export default PromoteYourself;
