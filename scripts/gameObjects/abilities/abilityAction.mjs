import GameObject from "../gameObject.mjs";

export default class AbilityAction extends GameObject {

    #name;
    #callback;
    get name() { return this.#name; }

    constructor(options) {

        console.log(options);

        super(options);

        this.#name = options.name;
        this.#callback = options.callback;

        const that = this;
        Object.defineProperty(AbilityAction, options.name, {
            get() {
                return that.#callback;
            }
        });

        this.postConstruct();

        return this.#callback;
    }
}
