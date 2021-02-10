import React, { useCallback, useMemo, useRef, useState } from 'react';
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
    const [numStudents, setNumStudents] = useState(1);
    const addNewStudent = useCallback(() => {
        setNumStudents(numStudents + 1);
        dispatch({
            field: 'students',
            value: [...state.students, { key: numStudents }],
        });
    }, [dispatch, numStudents, state.students]);
    const removeStudent = useCallback(
        i => () => {
            const newStudents = [...state.students];
            newStudents.splice(i, 1);
            dispatch({
                field: 'students',
                value: newStudents,
            });
        },
        [dispatch, state.students]
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
