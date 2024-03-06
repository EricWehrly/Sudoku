// import Listed from "./listed.mjs";

import Events from "./events.mjs";

Events.List.GameOptionChanged = 'GameOptionChanged';

export default class GameOption {

    #name;
    #value;

    get name() { return this.#name; }

    constructor(options) {

        this.#name = options.name;
        this.#value = options.value;

        // maybe we can move a bunch of this logic to a 'Listed' class ...
        const that = this;
        Object.defineProperty(GameOption, options.name, {
            // value: options.value,
            // writable: true,
            // enumerable: true,
            // configurable: true,
            get() {
                return that.#value;
            },
            set(newValue) {
                that.setter(newValue);

            },
        });

        Events.RaiseEvent(Events.List.GameOptionChanged, {
            option: this,
            newValue: this.#value
        });
    }

    setter(newValue) {

        if(this.#value == newValue) return;

        const oldValue = this.#value;
        this.#value = newValue;

        Events.RaiseEvent(Events.List.GameOptionChanged, {
            option: this,
            oldValue,
            newValue
        });
    }
}
