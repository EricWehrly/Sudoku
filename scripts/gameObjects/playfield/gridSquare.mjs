import GameObject from "../gameObject.mjs";
import Cell from "./cell.mjs";

export default class GridSquare extends GameObject {

    #cells;
    get cells() { return this.#cells; }

    get solved() {
        return this.solvedCells.length == this.#cells.length;
    }

    get solvedCells() {

        return this.#cells.filter(cell => cell.known);
    }

    /**
     * 
     * @param {Object} options 
     * @param {Cell} options.cell Cell to derive the square from
     */
    constructor(options) {

        super(options);
        if(options.cell) this.#cells = options.cell.squareCells;
    }
}