import EquipmentSlot from "../gameObjects/equipmentSlot.mjs";
import Renderer from "../rendering/dom/renderer.mjs";

export default class EquipmentRenderer extends Renderer {

    #equipmentSlot;

    constructor(options) {

        options.element = document.createElement('div');
        options.element.className = "ui equipment-slot";
        super(options);
        options.renderer = this;
        this.#equipmentSlot = options;

        const renderRoot = document.getElementById("ui-container");
        renderRoot.appendChild(this.element);
        const style = window.getComputedStyle(this.element);
        this.element.setAttribute('desiredDisplay', style.display);
    }

    update() {        
        if(this.#equipmentSlot.equipped) {
            this.element.innerHTML = this.#equipmentSlot.equipped.name;
        } else {
            this.element.innerHTML = 'Nothing equipped';
        }
    }
}

Events.Subscribe(Events.List.GameObjectCreated, function(gameObject) {

    if(gameObject instanceof EquipmentSlot) {
        new EquipmentRenderer(gameObject);
    }
}.bind(this));
