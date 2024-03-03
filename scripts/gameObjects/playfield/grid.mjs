import Seed from "../../core/seed.mjs";
import GameObject from "../gameObject.mjs";
import Cell from "./cell.mjs";

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

        for(var squareX = 0; squareX < this.#size; squareX++) {
            for(var squareY = 0; squareY < this.#size; squareY++) {
                for(var cellX = 0; cellX < this.#size; cellX++) {
                    for(var cellY = 0; cellY < this.#size; cellY++) {
                        const gridX = cellX + (squareX * 3);
                        const gridY = cellY + (squareY * 3);
                        this.addCell(gridX, gridY);
                    }
                }
            }
        }

        this.generateSudoku();

        super.postConstruct();
    }

    getCells(filterFunction) {
        
        return this.cells.filter(filterFunction);
    }

    addCell(x, y) {

        while(this.#cells.length < x + 1) {
            this.#cells.push([]);
        }
        while(this.#cells[x].length < y + 1) {
            this.#cells[x].push([]);
        }

        const cell = new Cell({
            grid: this,
            x,
            y
        });
        this.#cells[x][y] = cell;

        return cell;
    }

    generateSudoku() {

        let problemCount = 0;

        // iterate through each grid cell
        // determine its # based on adjacent cells and random seed
        for(var x = 0; x < this.#size * this.#size; x++) {
            for(var y = 0; y < this.#size * this.#size; y++) {
                const cell = this.#cells[x][y];

                let iterations = 0;
                const exclusions = cell.exclusions;
                while(cell.digit == undefined || exclusions.includes(cell.digit)) {

                    let excl = [...new Set(cell.exclusions)];
                    if(45 <= excl.reduce((a, b) => a + b, 0)) {
                        problemCount++;
                        console.log(excl.sort());
                        // debugger;
                        cell.digit = `x${problemCount}`;
                        cell.color = 'red';
                        break;
                    }
                    iterations++;
                    if(iterations > 3000) {
                        problemCount++;
                        console.log(excl.sort());
                        cell.digit = `y${problemCount}`;
                        cell.color = 'yellow';
                        break;
                    }

                    cell.digit = Math.floor(this.#seed.random(1, 9));
                }
            }
        }
    }
}
