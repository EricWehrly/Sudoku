import Util from "../../util.mjs";
import EquipmentSlot from "../equipmentSlot.mjs";
import GameObject from "../gameObject.mjs";

export default class Ability extends GameObject {

    #name;
    #trigger;
    #callback;
    #cost;
    #level = 0;
    #maxLevel;
    get name() { return this.#name; }
    get cost() { return this.#cost; }
    get level() { return this.#level; }
    get maxLevel() { return this.#maxLevel; }
    set level(value) {
        this.#level = value;
        this.renderer.update();
    }

    /**
     * 
     * @param {Object} options 
     * @param {Function} options.callback
     */
    constructor(options) {

        if(!Util.AssertProperty(options, 'name')) return null;
        // if(!Util.AssertProperty(options, 'trigger')) return null;
        if(!Util.AssertProperty(options, 'callback')) return null;

        super(options);

        this.#name = options.name;
        this.#callback = options.callback;
        this.#trigger = options.trigger;
        this.#maxLevel = options.maxLevel;

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

        if(this.#trigger) Events.Subscribe(this.#trigger, this.#handleTrigger.bind(this));

        Ability[this.#name] = this;
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
