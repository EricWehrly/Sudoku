import Util from "../../util.mjs";
import EquipmentSlot from "../equipmentSlot.mjs";
import GameObject from "../gameObject.mjs";

export default class Ability extends GameObject {

    #name;
    #trigger;
    #callback;
    #cost;
    #level = 0;
    get name() { return this.#name; }
    get cost() { return this.#cost; }
    get level() { return this.#level; }
    set level(value) {
        this.#level = value;
    }

    /**
     * 
     * @param {Object} options 
     * @param {Function} options.callback
     */
    constructor(options) {

        if(!Util.AssertProperty(options, 'name')) return null;
        if(!Util.AssertProperty(options, 'trigger')) return null;
        if(!Util.AssertProperty(options, 'callback')) return null;

        super(options);

        this.#name = options.name;
        this.#callback = options.callback;
        this.#trigger = options.trigger;

        if(options.costFunction) {
            this.#cost = options.costFunction;
            Object.defineProperty(this, 'cost', {
                get() {
                    return this.#cost();
                }
            });
        } else if (options.cost) {
            this.#cost = options.cost;
        }

        Events.Subscribe(this.#trigger, this.#handleTrigger.bind(this));

        super.postConstruct();
    }

    #handleTrigger(details) {

        const equipmentSlot = EquipmentSlot.GetSlot(this);
        if(equipmentSlot) {
            const options = {
                ability: this,
                equipmentSlot,
                ...details
            };
            this.#callback(options);
        }
    }
}
