import GameObject from "./gameObject.mjs";

export default class EquipmentSlot extends GameObject {

    static #slots = [];

    static GetSlot(ability) {

        for(var index = 0; index < EquipmentSlot.#slots.length; index++) {

            if(EquipmentSlot.#slots[index].equipped == ability) {
                return EquipmentSlot.#slots[index];
            }
        }

        return false;
    }

    #name;
    #equipped;
    #conditions;
    #size = 1;
    // later: slot type ..
    // ... for now, only ability

    get equipped() { return this.#equipped; }
    get size() { return this.#size; }
    get name() { return this.#name; }

    constructor(options) {

        super(options);
        if(options.size) this.#size = options.size;
        this.#conditions = options.conditions;
        this.#name = options.name;
        EquipmentSlot.#slots.push(this);

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
        this.renderer.update();
        return true;
    }
}
