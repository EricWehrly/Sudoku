import Util from "../util.mjs";
import Events from "../core/events.mjs";

export default class Hint {

    static #hints = [];

    static #used = 0;
    static #count = 0;
    static #max = 3;
    static get max() { return this.#max; }
    static set max(value) { this.#max = value; }
    static get count() { return this.#count; }
    static set count(value) {

        const oldValue = value;
        this.#count = value;
        Events.RaiseEvent(Events.List.ResourceChanged, {
            oldValue,
            newValue: this.#count,
            resource: Hint
        });
    }

    static get(execute = true) {

        if(this.count < 1) {
            console.log('(TODO: Tell the player) No hints available.');
            return {};
        }

        this.count--;
        this.#used++;

        // TODO: Replace "get the first hint" with
        // finding the best eligible hint
        const hint = Hint.#hints[0];
        const cell = hint.findCell();
        if(execute) {
            cell.active = true;
            Events.RaiseEvent(Events.List.SudokuGuess, cell.digit);
        }

        const returnObj = {
            cell,
            hint
        };

        Events.RaiseEvent(Events.List.HintUsed, returnObj);

        return returnObj;
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
}
