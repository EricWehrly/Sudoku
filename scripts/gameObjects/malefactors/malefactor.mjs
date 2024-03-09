import Events from "../../core/events.mjs";
import Util from "../../util.mjs";

export default class Malefactor {

    #activated = false;
    #name;
    #effect;
    #onActivate;
    get name() { return this.#name; }
    get activated() { return this.#activated; }

    constructor(options) {

        if(!Util.AssertProperty(options, 'name', this)) return null;

        if(options.effect) this.#effect = options.effect;
        if(options.activated) this.#activated = options.activated;
        if(options.onActivate) this.#onActivate = options.onActivate;

        this.#name = options.name;

        Malefactor[options.name] = this;

        Events.Subscribe(Events.List.SudokuGuessWrong, this.#wrong.bind(this));
    }

    activate() {
        this.#activated = true;

        if(this.#onActivate) this.#onActivate();
    }

    disable() {
        this.#activated = false;
    }

    #wrong(details) {

        console.log(details.cell);
        if(this.#activated && this.#effect) details.cell.addEffect(this.#effect);
    }
}
