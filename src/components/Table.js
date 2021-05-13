import React from 'react';
import ComponentFactory from './ComponentFactory';
import { getNestedValue } from '../utils/get-nested-value';
import styled from '@emotion/styled';
import { colorMap, size } from '../components/dev-hub/theme';

const StyledTable = styled('table')`
    border: 1px solid ${colorMap.greyLightTwo};
    border-collapse: collapse;
    margin: ${size.default} 0;
    table-layout: fixed;
    th,
    td {
        padding: ${size.small};
        border: 1px solid ${colorMap.greyLightTwo};
    }
`;

const TableContainer = styled('div')`
    overflow-x: auto;
`;

const AlignedTH = styled('th')`
    text-align: ${({ alignment }) => alignment};
`;

const TableHeading = ({ align, headingRow }) => (
    <thead valign="bottom">
        <tr>
            {headingRow.map((column, colIndex) => (
                <AlignedTH alignment={align[colIndex]} key={colIndex}>
                    <ComponentFactory
                        nodeData={getNestedValue(['children', 0], column)}
                    />
                </AlignedTH>
            ))}
        </tr>
    </thead>
);

const Table = ({ nodeData: { align, children } }) => {
    if (children && children.length) {
        const headingRow = children[0] && children[0].children;
        const otherRows = children.slice(1);
        return (
            <TableContainer>
                <StyledTable>
                    <TableHeading align={align} headingRow={headingRow} />
                    {otherRows.map((data, i) => (
                        <ComponentFactory
                            nodeData={{ align, ...data }}
                            key={i}
                        />
                    ))}
                </StyledTable>
            </TableContainer>
        );
    }
};

export default Table;
