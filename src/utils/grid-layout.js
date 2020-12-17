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
