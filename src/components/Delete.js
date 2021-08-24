import React from 'react';
import styled from '@emotion/styled';
import ComponentFactory from './ComponentFactory';

// Screenreaders typically do not handle strikethrough text well
// This gives us some additional callouts for screenreaders to read around the
// text --> https://developer.mozilla.org/en-US/docs/Web/HTML/Element/s
const S = styled('s')`
    /* Create some empty objects to be picked up as before/after */
    ::before,
    ::after {
        clip-path: inset(100%);
        clip: rect(1px, 1px, 1px, 1px);
        height: 1px;
        overflow: hidden;
        position: absolute;
        white-space: nowrap;
        width: 1px;
    }

    ::before {
        content: ' [start of strikethrough text] ';
    }

    ::after {
        content: ' [end of strikethrough text] ';
    }
`;

const Delete = ({ nodeData }) => (
    <S>
        {nodeData.children.map((child, index) => (
            <ComponentFactory nodeData={child} key={index} />
        ))}
    </S>
);

export default Delete;
