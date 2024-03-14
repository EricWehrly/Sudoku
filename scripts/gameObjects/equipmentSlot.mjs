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
    #trigger;
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
        this.#trigger = options.trigger;
        EquipmentSlot.#slots.push(this);

        if(this.#trigger) Events.Subscribe(this.#trigger, this.#triggerAbility.bind(this));

        super.postConstruct();
    }

    #triggerAbility(details) {

        if(this.#equipped) this.#equipped.handleTrigger(details);
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
