import React, { useMemo, useState } from 'react';
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

export default SingleStudentFieldset;
