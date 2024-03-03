// import Listed from "./listed.mjs";

export default class GameOption {

    constructor(options) {

        let bValue = options.value;
        // maybe we can move a bunch of this logic to a 'Listed' class ...
        Object.defineProperty(GameOption, options.name, {
            // value: options.value,
            // writable: true,
            // enumerable: true,
            // configurable: true,
            get() {
                return bValue;
            },
            set(newValue) {
                bValue = newValue;
            },
        });
    }
}
