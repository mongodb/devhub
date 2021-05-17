import React from 'react';
import ComponentFactory from './ComponentFactory';

const Emphasis = ({ nodeData }) => (
    <em>
        {nodeData.children.map((child, index) => (
            <ComponentFactory nodeData={child} key={index} />
        ))}
    </em>
);

export default Emphasis;
