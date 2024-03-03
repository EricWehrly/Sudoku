export default class Cell {

    #grid;

    #active = false;
    #highlight = false;

    get active() { return this.#active; }
    set active(value) { 

        if(this.#active == value) return;

        const that = this;
        this.#grid.cells.forEach(function deActivate(cell) {
            if(cell == that) return;
            cell.active = false;
            cell.highlight = false;
        })
        this.#active = value;

        this.renderer.update();
    }

    get highlight() { return this.#highlight; }
    set highlight(value) { this.#highlight = value; }

    constructor(options) {

        // TODO: assert options

        this.#grid = options.grid;
    }
}
