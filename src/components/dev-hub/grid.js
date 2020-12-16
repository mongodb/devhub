import React, { useCallback, useMemo } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { size } from './theme';

const GridContainer = styled('div')`
    display: grid;
    grid-template-columns: repeat(
        ${({ layoutCols }) => layoutCols},
        ${({ colWidth }) => colWidth}
    );
    grid-template-rows: repeat(
        ${({ layoutRows }) => layoutRows},
        ${({ rowHeight }) => rowHeight}
    );
    gap: ${size.default};
`;

const gridSpan = colSpan => css`
    grid-column-end: span ${colSpan};
`;

const getPosition = (i, layout) => {
    let count = 0;
    let index = -1;
    while (i >= count) {
        index++;
        if (i < count + layout[index].length) {
            return layout[index][i - count];
        }
        count += layout[index].length;
    }
};

// Wrapper component which takes a [[layout]] and constructs a grid with it
const Grid = ({
    children,
    layout,
    colWidth = '1fr',
    rowHeight = '1fr',
    ...props
}) => {
    const layoutRows = layout.length;
    const layoutCols = layout[0].reduce((a, b) => a + b, 0);
    const gridElements = useMemo(
        () =>
            children.map((child, i) =>
                React.cloneElement(child, {
                    css: gridSpan(getPosition(i, layout)),
                    key: i,
                })
            ),
        [children, layout]
    );
    return (
        <GridContainer
            colWidth={colWidth}
            rowHeight={rowHeight}
            layoutRows={layoutRows}
            layoutCols={layoutCols}
            {...props}
        >
            {gridElements}
        </GridContainer>
    );
};

export default Grid;
