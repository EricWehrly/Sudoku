export default class Ability {

    #trigger;
    #action;

    /**
     * 
     * @param {Object} options 
     * @param {AbilityTrigger} options.trigger
     */
    constructor(options) {

        this.#trigger = options.trigger;
        this.#action = options.action;

        Events.Subscribe(this.#trigger, this.#handleTrigger.bind(this));
    }

    #handleTrigger() {

        this.#action();
    }
}
