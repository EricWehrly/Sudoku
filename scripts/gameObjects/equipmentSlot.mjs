import GameObject from "./gameObject.mjs";

export default class EquipmentSlot extends GameObject {

    #equipped;
    #conditions;
    #size = 1;
    // later: slot type ..
    // ... for now, only ability

    get equipped() { return this.#equipped; }
    get size() { return this.#size; }

    constructor(options) {

        super(options);
        if(options.size) this.#size = options.size;
        this.#conditions = options.conditions;

        super.postConstruct();
    }

    canEquip(item) {

        // size
        // conditions

        return true;
    }

    equip(item) {

        // if canEquip

        this.#equipped = item;
        return true;
    }
}
