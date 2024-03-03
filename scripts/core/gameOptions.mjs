// import Listed from "./listed.mjs";

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
    }

    setter(newValue) {
        this.#value = newValue;
    }
}
