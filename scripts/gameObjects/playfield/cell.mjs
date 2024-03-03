export default class Cell {

    #grid;
    #x;
    #y;
    #digit;
    #squareCoords;

    #active = false;
    #highlight = false;

    get x() { return this.#x; }
    get y() { return this.#y; }
    get digit() { return this.#digit; }
    set digit(value) { this.#digit = value; }   // we could probably force constructor to provide this

    get active() { return this.#active; }
    set active(value) { 

        if(this.#active == value) return;

        if(value == true) {
            if(this.#grid.active) {
                this.#grid.active.active = false;
            }
            this.#grid.active = this;
        }

        const that = this;
        this.#grid.cells.forEach(function deActivate(cell) {
            if(cell == that) return;
            // cell.active = false;
            cell.highlight = value == true && (cell.x == that.x || cell.y == that.y);
        })
        this.#active = value;

        this.renderer.update();
    }

    get highlight() { return this.#highlight; }
    set highlight(value) { 

        this.#highlight = value;
        this.renderer.update();
    }

    get squareCoords() {

        if(!this.#squareCoords) {

            let x = Math.floor(this.x / this.#grid.size);
            let y = Math.floor(this.y / this.#grid.size);

            this.#squareCoords = {
                x,
                y
            };
        }

        return this.#squareCoords;
    }

    get rowCells() {

        const cells = [];
        for(var x = 0; x < (this.#grid.size * this.#grid.size); x++) {
            cells.push(this.#grid.cell(x, this.y));
        }

        return cells;
    }

    get colCells() {

        const cells = [];
        for(var y = 0; y < (this.#grid.size * this.#grid.size); y++) {
            cells.push(this.#grid.cell(this.x, y));
        }

        return cells;
    }

    get squareCells() {

        return this.#grid.getcells(cell => cell.squareCoords == this.squareCoords);
    }

    get connectedCells() {

        const cells = [
            ...this.rowCells,
            ...this.colCells,
            ...this.squareCells,
        ];

        return cells;
    }

    constructor(options) {

        // TODO: assert options

        this.#grid = options.grid;
        this.#x = options.x;
        this.#y = options.y;
    }
}
