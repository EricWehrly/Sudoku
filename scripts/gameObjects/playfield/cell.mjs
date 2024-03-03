export default class Cell {

    #grid;

    #active = false;

    get active() { return this.#active; }
    set active(value) { 
        // all other cells active false ..

        console.log(this.#grid.cells);
        this.#active = value;
    }

    constructor(options) {

        // TODO: assert options

        this.#grid = options.grid;
    }
}
