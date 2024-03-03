import Seed from "../../core/seed.mjs";
import GameObject from "../gameObject.mjs";
import Cell from "./cell.mjs";
import Puzzle from "../../puzzle.mjs";

export default class Grid extends GameObject {

    static #RANDOM_SIX_DIGIT_NUMBER = Math.floor(100000 + Math.random() * 900000);

    #size = 0;

    get size() { return this.#size; }

    #cells = [[],];
    get cells() { return this.#cells.flat(); }

    #active;
    get active() { return this.#active; }
    set active(value) { this.#active = value; }

    #seed;

    cell(x, y) {
        
        return this.#cells[x][y];
    }

    /**
     * 
     * @param {Object} options 
     * @param {int} options.size Number of cells to a side in the grid (will always be square)
     */
    constructor(options) {

        super(options);

        // assert size is an int?

        this.#size = options?.size || 3;
        this.#seed = options?.seed || new Seed(Grid.#RANDOM_SIX_DIGIT_NUMBER);

        const puzzle = Puzzle();
        for(var squareX = 0; squareX < this.#size; squareX++) {
            for(var squareY = 0; squareY < this.#size; squareY++) {
                for(var cellX = 0; cellX < this.#size; cellX++) {
                    for(var cellY = 0; cellY < this.#size; cellY++) {
                        const gridX = cellX + (squareX * 3);
                        const gridY = cellY + (squareY * 3);
                        this.addCell(gridX, gridY, puzzle[gridX][gridY]);
                    }
                }
            }
        }

        super.postConstruct();
    }

    getCells(filterFunction) {
        
        return this.cells.filter(filterFunction);
    }

    addCell(x, y, digit) {

        while(this.#cells.length < x + 1) {
            this.#cells.push([]);
        }
        while(this.#cells[x].length < y + 1) {
            this.#cells[x].push([]);
        }

        const cell = new Cell({
            grid: this,
            x,
            y,
            digit
        });
        this.#cells[x][y] = cell;

        return cell;
    }
}
