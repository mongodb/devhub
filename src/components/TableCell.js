import React from 'react';
import styled from '@emotion/styled';
import ComponentFactory from './ComponentFactory';

const AlignedTD = styled('td')`
    text-align: ${({ alignment }) => alignment};
`;

const TableCell = ({ nodeData: { align, children, index } }) => {
    const alignmentOption = align && index !== null && align[index];
    return (
        <AlignedTD alignment={alignmentOption}>
            {children.map((column, colIndex) => (
                <ComponentFactory nodeData={column} key={colIndex} />
            ))}
        </AlignedTD>
    );
};

export default TableCell;
