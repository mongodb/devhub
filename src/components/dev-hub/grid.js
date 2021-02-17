import React, { useMemo, useRef } from 'react';
import styled from '@emotion/styled';
import useMedia from '~hooks/use-media';
import { GridLayout } from '../../utils/grid-layout';
import { screenSize, size } from './theme';
import { useRefDimensions } from '~hooks/use-ref-dimensions';

const calculateGridRowHeight = (totalWidth, gridGap, layoutCols) => `calc(
        (
                ${totalWidth}px -
                    ${(layoutCols - 1) * size.stripUnit(gridGap)}px
            ) / ${layoutCols}
    );`;

const GridContainer = styled('div')`
    display: grid;
    grid-template-columns: repeat(${({ layoutCols }) => layoutCols}, 1fr);
    grid-auto-rows: ${({ totalWidth, gridGap, layoutCols }) =>
        calculateGridRowHeight(totalWidth, gridGap, layoutCols)};
    grid-gap: ${({ gridGap }) => gridGap};
`;

const gridSpan = ({ rowSpan, colSpan }) => ({
    gridColumnEnd: `span ${colSpan}`,
    gridRowEnd: `span ${rowSpan}`,
});
/**
 * "layout" is an object which describes the repetitive nature of the grid with
 * two properties "rowSpan" and "colSpan" which both are arrays defining the
 * shape of the grid. for example {rowSpan: [1], colSpan: [1]} with cols=12
 * defines a 12-column grid where each item is 1 column and even in height.
 *
 * See utils/grid-layout.js and grid.stories.mdx for more.
 */
const Grid = ({
    children,
    layout,
    mobileLayout,
    mobileGridGap = size.default,
    mobileNumCols,
    numCols,
    gridGap = size.default,
    rowHeight = '1fr',
    ...props
}) => {
    const thisGrid = useRef(null);
    const { width } = useRefDimensions(thisGrid);
    const isMobile = useMedia(screenSize.upToMedium);
    const activeLayout = useMemo(
        () => (isMobile ? mobileLayout || layout : layout),
        [isMobile, layout, mobileLayout]
    );
    const gridLayout = useMemo(
        () => new GridLayout(activeLayout.rowSpan, activeLayout.colSpan),
        [activeLayout]
    );
    const gridElements = useMemo(
        () =>
            children.map((child, i) =>
                React.cloneElement(child, {
                    style: {
                        ...gridSpan(gridLayout.position(i)),
                        ...child.style,
                    },
                    key: i,
                })
            ),
        [children, gridLayout]
    );
    return (
        <GridContainer
            ref={thisGrid}
            gridGap={isMobile ? mobileGridGap : gridGap}
            rowHeight={rowHeight}
            totalWidth={width}
            layoutCols={isMobile ? mobileNumCols || numCols : numCols}
            {...props}
        >
            {gridElements}
        </GridContainer>
    );
};

export default Grid;
