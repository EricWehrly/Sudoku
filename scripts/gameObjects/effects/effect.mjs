import Events from "../../core/events.mjs";
import Grid from "../playfield/grid.mjs";

export default class Effect {

    #actionOnTurn;
    #name;
    get name() { return this.#name; }

    constructor(options) {

        if(typeof options == 'string') this.#name = options;
        else this.#name = options.name;
        Effect[this.#name] = this;

        if(options.actionOnTurn) this.#actionOnTurn = options.actionOnTurn;

        Events.Subscribe(Events.List.SudokuGuess, this.#sudokuGuess.bind(this));
    }

    #sudokuGuess() {

        const cells = this.#getAffectedCells();
        cells.forEach(cell => this.#actionOnTurn(cell));
    }

    #getAffectedCells() {

        return Grid.Grid.getCells(cell => cell.effects.includes(this));
    }
}

const debugEffect = new Effect({
    name: 'Debug'
});
