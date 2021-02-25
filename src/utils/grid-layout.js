/**
 * Class which takes a grid measured in span of rows and cols (not number of rows, cols).
 *
 * `position` => i: nonnegative-integer, returns an object containing how tall and wide position i should span in the grid.
 */
export class GridLayout {
    constructor(rowSpan, colSpan) {
        this.rowSpan = rowSpan;
        this.colSpan = colSpan;
    }

    position = i => ({
        rowSpan: this.rowSpan[i % this.rowSpan.length],
        colSpan: this.colSpan[i % this.colSpan.length],
    });
}
