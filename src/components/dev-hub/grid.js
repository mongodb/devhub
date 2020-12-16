import React, { useCallback, useMemo } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

const GridContainer = styled('div')`
    display: grid;
    grid-template-columns: repeat(${({ layoutCols }) => layoutCols}, 1fr);
    grid-template-rows: repeat(${({ layoutRows }) => layoutRows}, 1fr);
`;

const gridSpan = colSpan => css`
    grid-column-end: span ${colSpan};
`;

// Wrapper component which takes a layout and constructs a grid with it
const Grid = ({ children, layout, ...props }) => {
    const layoutRows = layout.length;
    const layoutCols = layout[0].reduce((a, b) => a + b, 0);
    const layoutPosition = useCallback(i => layout[0][i % layout[0].length], [
        layout,
    ]);
    const gridElements = useMemo(
        () =>
            children.map((child, i) =>
                React.cloneElement(child, {
                    css: gridSpan(layoutPosition(i)),
                    key: i,
                })
            ),
        [children, layoutPosition]
    );
    return (
        <GridContainer
            layoutRows={layoutRows}
            layoutCols={layoutCols}
            {...props}
        >
            {gridElements}
        </GridContainer>
    );
};

export default Grid;
