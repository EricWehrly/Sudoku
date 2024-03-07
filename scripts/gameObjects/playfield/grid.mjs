import Seed from "../../core/seed.mjs";
import GameObject from "../gameObject.mjs";
import Cell from "./cell.mjs";
import Puzzle from "../../puzzle.mjs";
import Events from "../../core/events.mjs";
import GameOption from "../../core/gameOptions.mjs";

export default class Grid extends GameObject {

    static #Grid;
    static get Grid() { return Grid.#Grid; }

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

        if (y == undefined) {
            return this.cells[x];
        }

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

        if(!Grid.#Grid) Grid.#Grid = this;

        this.#size = options?.size || 3;
        this.#seed = options?.seed || new Seed(Grid.#RANDOM_SIX_DIGIT_NUMBER);

        this.#addCells();
        this.#makePrefills();

        super.postConstruct();

        Events.Subscribe(Events.List.SudokuGuess, this.#sudokuGuess.bind(this));
    }

    getCells(filterFunction) {

        return this.cells.filter(filterFunction);
    }

    addCell(x, y, digit) {

        while (this.#cells.length < x + 1) {
            this.#cells.push([]);
        }
        while (this.#cells[x].length < y + 1) {
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

    #sudokuGuess(number) {

        const cell = this.#active;
        console.log(cell);
        if (cell.known) return;

        if(GameOption.NotesMode) {
            cell.toggleNote(number);
        } else {
            if (number == cell.digit) {
                cell.wrongGuess = false;
                cell.known = true;
                cell.renderText = number;
                Events.RaiseEvent(Events.List.SudokuGuessCorrect, { cell });
            } else {
                cell.wrongGuess = true;
                cell.renderText = number;
                Events.RaiseEvent(Events.List.SudokuGuessWrong, { cell });
            }
        }
    }

    #addCells() {

        const puzzle = Puzzle();
        let cellNumber = 0;
        for (var squareY = 0; squareY < this.#size; squareY++) {
            for (var squareX = 0; squareX < this.#size; squareX++) {
                for (var cellY = 0; cellY < this.#size; cellY++) {
                    for (var cellX = 0; cellX < this.#size; cellX++) {
                        cellNumber++;
                        const gridX = cellX + (squareX * 3);
                        const gridY = cellY + (squareY * 3);
                        this.addCell(gridX, gridY, puzzle[gridX][gridY]);
                    }
                }
            }
        }
    }

    #makePrefills() {

        const maxCells = this.#size * this.#size * this.#size * this.#size;
        let prefillCount = 9;

        while (prefillCount > 0) {
            const cellIndex = Math.floor(this.#seed.random(0, maxCells));
            const cell = this.cell(cellIndex);
            if (cell.prefill == false) {
                cell.prefill = true;
                prefillCount--;
            }
        }
    }
}
