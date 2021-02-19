import React, { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import CondensedStudentEntry from './condensed-student-entry';
import NewStudentFieldset from './new-student-fieldset';
import { size } from '~components/dev-hub/theme';

const ShowOnExpanded = styled('div')`
    display: ${({ isExpanded }) => (isExpanded ? 'contents' : 'none')};
    > * {
        margin-bottom: ${size.mediumLarge};
    }
`;

const ShowOnCondensed = styled('div')`
    display: ${({ isExpanded }) => (isExpanded ? 'none' : 'contents')};
    > * {
        margin-bottom: ${size.mediumLarge};
    }
`;

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

    return (
        <>
            <ShowOnCondensed isExpanded={isExpanded}>
                <CondensedStudentEntry
                    authorImage={authorImage}
                    state={state}
                    onEdit={onEdit}
                    onRemove={onRemove}
                />
            </ShowOnCondensed>
            <ShowOnExpanded isExpanded={isExpanded}>
                <NewStudentFieldset
                    authorImage={authorImage}
                    setActivePicture={setActivePicture}
                    onChange={onChange}
                    state={state}
                />
            </ShowOnExpanded>
        </>
    );
};

export default SingleStudentFieldset;
