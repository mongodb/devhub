import { GridLayout } from '../../src/utils/grid-layout';

it('should calculate position in a grid using row and col span', () => {
    const simpleRepeatedGrid = { rows: [1], cols: [1] };
    const repeatedGridInstance = new GridLayout(
        simpleRepeatedGrid.rows,
        simpleRepeatedGrid.cols
    );

    // Check the grid does repeat indefinitely
    for (let i = 0; i < 10; i++) {
        expect(repeatedGridInstance.position(i)).toStrictEqual({
            rowSpan: 1,
            colSpan: 1,
        });
    }

    // Check a grid with a constant value in one axis does not impact all
    const realisticGrid = { rows: [1], cols: [2, 1, 1, 1, 1, 1, 2] };
    const repeatedRealisticGridInstance = new GridLayout(
        realisticGrid.rows,
        realisticGrid.cols
    );
    for (let i = 0; i < 10; i++) {
        expect(repeatedRealisticGridInstance.position(i)).toStrictEqual({
            rowSpan: 1,
            colSpan: realisticGrid.cols[i % realisticGrid.cols.length],
        });
    }

    // Check a grid with varying rows and cols
    const advancedGrid = { rows: [1, 2, 1, 1, 2], cols: [2, 1, 1, 1, 1, 1, 2] };
    const advancedGridInstance = new GridLayout(
        advancedGrid.rows,
        advancedGrid.cols
    );
    for (let i = 0; i < 10; i++) {
        expect(advancedGridInstance.position(i)).toStrictEqual({
            rowSpan: advancedGrid.rows[i % advancedGrid.rows.length],
            colSpan: advancedGrid.cols[i % advancedGrid.cols.length],
        });
    }
});
