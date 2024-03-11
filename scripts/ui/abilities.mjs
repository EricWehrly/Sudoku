import Events from "../core/events.mjs";
import Ability from "../gameObjects/abilities/ability.mjs";
import Renderer from "../rendering/dom/renderer.mjs";

export default class AbilityRenderer extends Renderer {

    static #container;
    static get container() { return AbilityRenderer.#container; }
    static {
        AbilityRenderer.#container = document.createElement('div');
        AbilityRenderer.#container.className = "ui ability container";

        AbilityRenderer.#attachToRoot();

        Events.Subscribe(Events.List.GameOptionChanged, AbilityRenderer.#gameOptionChanged);
    }

    static #gameOptionChanged(details) {

        if(details.option.name == 'ShowAbilitiesMenu') {

            if(details.newValue) AbilityRenderer.#container.style.display = 'block';
            else AbilityRenderer.#container.style.display = 'none';
        }
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

    #ability;

    constructor(options) {

        options.element = document.createElement('div');
        options.element.className = `ui ability`;

        AbilityRenderer.container.appendChild(options.element);
        super(options);
        options.renderer = this;
        this.#ability = options;

        this.element.innerHTML = this.#ability.name;

        options.element.draggable = true;
        options.element.addEventListener("dragstart", this.dragstartHandler.bind(this));
    }
    
    dragstartHandler(ev) {

        // ev.dataTransfer.setData("text/plain", ev.target.id);
        console.log(this.#ability);
        ev.dataTransfer.setData('text/plain', this.#ability.name);
    }
}

Events.Subscribe(Events.List.GameObjectCreated, function(gameObject) {

    if(gameObject instanceof Ability) {
        new AbilityRenderer(gameObject);
    }
}.bind(this));
