import React, { useMemo } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { GridLayout } from '../../utils/grid-layout';
import { size } from './theme';

const GridContainer = styled('div')`
    display: grid;
    grid-template-columns: repeat(${({ layoutCols }) => layoutCols}, 1fr);
    grid-auto-rows: ${({ rowHeight }) => rowHeight};
    gap: ${size.default};
`;

const gridSpan = ({ rowSpan, colSpan }) => css`
    grid-row-end: span ${rowSpan};
    grid-column-end: span ${colSpan};
`;

/**
 * "layout" is an object which describes the repetitive nature of the grid with
 * two properties "rowSpan" and "colSpan" which both are arrays defining the
 * shape of the grid. for example {rowSpan: [1], colSpan: [1]} with cols=12
 * defines a 12-column grid where each item is 1 column and even in height.
 *
 * See utils/grid-layout.js and grid.stories.mdx for more.
 */
const Grid = ({ children, layout, numCols, rowHeight = '1fr', ...props }) => {
    const gridLayout = useMemo(
        () => new GridLayout(layout.rowSpan, layout.colSpan),
        [layout]
    );
    const gridElements = useMemo(
        () =>
            children.map((child, i) =>
                React.cloneElement(child, {
                    css: gridSpan(gridLayout.position(i)),
                    key: i,
                })
            ),
        [children, gridLayout]
    );
    return (
        <GridContainer rowHeight={rowHeight} layoutCols={numCols} {...props}>
            {gridElements}
        </GridContainer>
    );
};

export default Grid;
