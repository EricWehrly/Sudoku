import Util from "../util.mjs";

export default class Hint {

    static #hints = [];

    static #used = 0;
    static #count = 0;
    static #max = 3;
    static get count() { return this.#count; }
    static set count(value) { this.#count = value; }
    static get max() { return this.#max; }
    static set max(value) { this.#max = value; }

    static get() {
        this.count--;
        this.#used++;

        const cell = Hint.#hints[0].findCell();

        // find out the best eligible hint

        return {
            cell
        }
    }

    #hintCell;
    #findCellFn;
    get findCell() { return this.#findCellFn; }

    constructor(options) {

        if(!Util.AssertProperty(options, 'findCell')) return null;

        this.#findCellFn = options.findCell;

        this.#hintCell = this.#findCellFn;

        Hint.#hints.push(this);

        // subscribe to SudokuGuess
        // re-run findCell if cell is the cached
    }

    get hint() { return this.#hintCell;}

    get eligible() { return false; }

    // method to identify (and cache) which cell the hint will target
    // invalidate if the sudoku guess is for that cell
}
