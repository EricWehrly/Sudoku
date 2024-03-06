import AbilityAction from "../gameObjects/abilities/abilityAction.mjs";
import Renderer from "../rendering/dom/renderer.mjs";
import EquipmentRenderer from "./equipment.mjs";

export default class AbilityRenderer extends Renderer {

    #abilityAction;

    constructor(options) {

        options.element = document.createElement('div');
        options.element.className = `ui ability`;
        super(options);
        options.renderer = this;
        this.#abilityAction = options;

        EquipmentRenderer.equipmentContainer.appendChild(this.element);
        const style = window.getComputedStyle(this.element);
        if(style.display) this.element.setAttribute('desiredDisplay', style.display);

        this.element.innerHTML = this.#abilityAction.name;
    }
}

Events.Subscribe(Events.List.GameObjectCreated, function(gameObject) {

    if(gameObject instanceof AbilityAction) {
        new AbilityRenderer(gameObject);
    }
}.bind(this));
