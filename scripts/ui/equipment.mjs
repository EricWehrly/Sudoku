import EquipmentSlot from "../gameObjects/equipmentSlot.mjs";
import Renderer from "../rendering/dom/renderer.mjs";

export default class EquipmentRenderer extends Renderer {

    static #equipmentContainer;
    static get equipmentContainer() { return EquipmentRenderer.#equipmentContainer; }
    static {
        EquipmentRenderer.#equipmentContainer = document.createElement('div');
        EquipmentRenderer.#equipmentContainer.className = "ui equipment container";

        EquipmentRenderer.#attachToRoot();
    }

    static #attachToRoot() {

        const renderRoot = document.getElementById("ui-container");
        if(renderRoot) {
            renderRoot.appendChild(EquipmentRenderer.#equipmentContainer);
            const title = document.createElement('h3');
            title.innerHTML = 'Equipped';
            EquipmentRenderer.#equipmentContainer.appendChild(title);
        } else {
            // cap recursion iteration count?
            setTimeout(EquipmentRenderer.#attachToRoot.bind(this), 10);
        }
    }

    #equipmentSlot;

    constructor(options) {

        options.element = document.createElement('div');
        options.element.className = `ui equipment slot x${options.size}`;
        super(options);
        options.renderer = this;
        this.#equipmentSlot = options;

        EquipmentRenderer.#equipmentContainer.appendChild(this.element);
        const style = window.getComputedStyle(this.element);
        this.element.setAttribute('desiredDisplay', style.display);

        if(options.name) this.element.innerHTML = options.name;

        options.element.addEventListener("drop", this.dropHandler.bind(this));
        options.element.addEventListener("dragover", this.onDragOver.bind(this));
        // options.element.addEventListener("dragenter", this.onDragEnter.bind(this));
        options.element.addEventListener("dragleave", this.onDragLeave.bind(this));
    }

    update() {        
        if(this.#equipmentSlot.equipped) {
            this.element.innerHTML = this.#equipmentSlot.equipped.name;
        } else {
            this.element.innerHTML = 'Nothing equipped';
        }
    }

    onDragOver(event) {
        this.addClass('highlight');
        event.preventDefault();
    }

    dropHandler(event) {
        this.removeClass('highlight');
        console.log(event);

        // get the ability and try to equip it
    }

    onDragEnter(event) {

        this.addClass('highlight');
    }

    onDragLeave(event) {

        this.removeClass('highlight');
    }
}

Events.Subscribe(Events.List.GameObjectCreated, function(gameObject) {

    if(gameObject instanceof EquipmentSlot) {
        new EquipmentRenderer(gameObject);
    }
}.bind(this));
