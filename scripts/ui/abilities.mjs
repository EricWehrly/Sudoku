import AbilityAction from "../gameObjects/abilities/abilityAction.mjs";
import Renderer from "../rendering/dom/renderer.mjs";

export default class AbilityRenderer extends Renderer {

    static #container;
    static get container() { return AbilityRenderer.#container; }
    static {
        AbilityRenderer.#container = document.createElement('div');
        AbilityRenderer.#container.className = "ui ability container";

        AbilityRenderer.#attachToRoot();
    }

    static #attachToRoot() {

        const renderRoot = document.getElementById("ui-container");
        if(renderRoot) {
            renderRoot.appendChild(AbilityRenderer.#container);
            const title = document.createElement('h3');
            title.innerHTML = 'Abilities';
            AbilityRenderer.#container.appendChild(title);
        } else {
            // cap recursion iteration count?
            setTimeout(AbilityRenderer.#attachToRoot.bind(this), 10);
        }
    }

    #abilityAction;

    constructor(options) {

        options.element = document.createElement('div');
        options.element.className = `ui ability`;
        super(options);
        options.renderer = this;
        this.#abilityAction = options;

        AbilityRenderer.container.appendChild(this.element);
        const style = window.getComputedStyle(this.element);
        if(style.display) this.element.setAttribute('desiredDisplay', style.display);

        this.element.innerHTML = this.#abilityAction.name;

        options.element.draggable = true;
        options.element.addEventListener("dragstart", this.dragstartHandler.bind(this));
    }
    
    dragstartHandler(ev) {

        // Add the target element's id to the data transfer object
        // ev.dataTransfer.setData("text/plain", ev.target.id);
        console.log("Whee!");
    }
}

Events.Subscribe(Events.List.GameObjectCreated, function(gameObject) {

    if(gameObject instanceof AbilityAction) {
        new AbilityRenderer(gameObject);
    }
}.bind(this));
