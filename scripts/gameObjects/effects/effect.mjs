import Events from "../../core/events.mjs";

Events.List.EffectAdded = "EffectAdded";
Events.List.EffectRemoved = "EffectRemoved";

export default class Effect {

    #name;
    get name() { return this.#name; }

    constructor(options) {

        if(typeof options == 'string') this.#name = options;
        else this.#name = options.name;
    }
}
