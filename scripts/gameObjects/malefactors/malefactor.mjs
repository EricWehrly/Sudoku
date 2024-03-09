import Events from "../../core/events.mjs";
import Util from "../../util.mjs";

export default class Malefactor {

    #enabled = false;
    #name;
    #effect;
    #onEnable;
    get name() { return this.#name; }
    get enabled() { return this.#enabled; }

    constructor(options) {

        if(!Util.AssertProperty(options, 'name', this)) return null;

        if(options.effect) this.#effect = options.effect;
        if(options.enabled) this.#enabled = options.enabled;
        if(options.onEnable) this.#onEnable = options.onEnable;

        this.#name = options.name;

        Malefactor[options.name] = this;

        Events.Subscribe(Events.List.SudokuGuessWrong, this.#wrong.bind(this));
    }

    enable() {
        this.#enabled = true;

        if(this.#onEnable) this.#onEnable();
    }

    disable() {
        this.#enabled = false;
    }

    #wrong(details) {

        console.log(details.cell);
        if(this.#enabled && this.#effect) details.cell.addEffect(this.#effect);
    }
}
