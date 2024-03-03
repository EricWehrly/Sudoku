import GameObject from "../gameObject.mjs";
import Cell from "./cell.mjs";

export default class Grid extends GameObject {

    #size = 0;

    get size() { return this.#size; }

    #cells = [[],];
    get cells() { return this.#cells.flat(); }

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

        for(var squareX = 0; squareX < this.#size; squareX++) {
            for(var squareY = 0; squareY < this.#size; squareY++) {
                for(var cellX = 0; cellX < this.#size; cellX++) {
                    for(var cellY = 0; cellY < this.#size; cellY++) {
                        const gridX = cellX + (squareX * 3);
                        const gridY = cellY + (squareY * 3);
                        const cell = new Cell({
                            grid: this,
                            x: gridX,
                            y: gridY
                        });

                        while(this.#cells.length < gridX + 1) {
                            this.#cells.push([]);
                        }
                        while(this.#cells[gridX].length < gridY + 1) {
                            this.#cells[gridX].push([]);
                        }

                        this.#cells[gridX][gridY] = cell;
                    }
                }
            }
        }

        super.postConstruct();
    }
}
