import Ability from "../gameObjects/abilities/ability.mjs";
import EquipmentSlot from "../gameObjects/equipmentSlot.mjs";
import Renderer from "../rendering/dom/renderer.mjs";

export default class EquipmentRenderer extends Renderer {

    static #equipmentContainer;
    static get equipmentContainer() { return EquipmentRenderer.#equipmentContainer; }
    static {
        EquipmentRenderer.#equipmentContainer = document.createElement('div');
        EquipmentRenderer.#equipmentContainer.className = "ui equipment container";

        EquipmentRenderer.#attachToRoot();

        Events.Subscribe(Events.List.GameOptionChanged, EquipmentRenderer.#gameOptionChanged);
    }

    static #gameOptionChanged(details) {

        if(details.option.name == 'ShowAbilitiesMenu') {

            if(details.newValue) EquipmentRenderer.#equipmentContainer.style.display = 'block';
            else EquipmentRenderer.#equipmentContainer.style.display = 'none';
        }
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
    #equippedElement;

    constructor(options) {

        options.element = document.createElement('div');
        options.element.className = `ui equipment slot x${options.size}`;

        EquipmentRenderer.#equipmentContainer.appendChild(options.element);
        super(options);
        options.renderer = this;
        this.#equipmentSlot = options;

        this.#renderName(options);

        this.#equippedElement = document.createElement('span');
        this.element.appendChild(this.#equippedElement);
        this.update();

        options.element.addEventListener("drop", this.dropHandler.bind(this));
        options.element.addEventListener("dragover", this.onDragOver.bind(this));
        options.element.addEventListener("dragleave", this.onDragLeave.bind(this));
    }

    #renderName(options) {

        const name = options.name || this.#equipmentSlot.name;
        if(name) {
            const title = document.createElement('span');
            title.innerHTML = `${name}: `;
            this.element.appendChild(title);
        }
    }

    update() {        
        if(this.#equipmentSlot?.equipped?.name) {
            this.#equippedElement.innerText = this.#equipmentSlot.equipped.name;
        } else {
            this.#equippedElement.innerText = '(none)';
        }
    }

    onDragOver(event) {
        this.addClass('highlight');
        event.preventDefault();
    }

    dropHandler(event) {
        this.removeClass('highlight');
        const data = event.dataTransfer.getData("text/plain");
        const ability = Ability[data];

        this.#equipmentSlot.equip(ability);
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
