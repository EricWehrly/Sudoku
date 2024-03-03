export default class Cell {

    #grid;
    #x;
    #y;
    #digit;

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

    constructor(options) {

        // TODO: assert options

        this.#grid = options.grid;
        this.#x = options.x;
        this.#y = options.y;
    }
}
