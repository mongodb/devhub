import React from 'react';
import ComponentFactory from './ComponentFactory';

const TableRow = ({ nodeData: { align, children } }) => (
    <tr>
        {children.map((column, index) => (
            <ComponentFactory
                nodeData={{ align, index, ...column }}
                key={index}
            />
        ))}
    </tr>
);

export default TableRow;
