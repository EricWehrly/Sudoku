import Util from "../../util.mjs";
import EquipmentSlot from "../equipmentSlot.mjs";

export default class Ability {

    #trigger;
    #action;
    #level = 0;
    get level() { return this.#level; }
    set level(value) {
        this.#level = value;
    }

    /**
     * 
     * @param {Object} options 
     * @param {AbilityTrigger} options.trigger
     */
    constructor(options) {

        if(!Util.AssertProperty(options, 'trigger', this)) return null;
        if(!Util.AssertProperty(options, 'action', this)) return null;

        this.#trigger = options.trigger;
        this.#action = options.action;

        Events.Subscribe(this.#trigger, this.#handleTrigger.bind(this));
    }

    #handleTrigger(details) {

        const equipmentSlot = EquipmentSlot.GetSlot(this);
        if(equipmentSlot) {
            const options = {
                ability: this,
                equipmentSlot,
                ...details
            };
            this.#action(options);
        }
    }
}
