import Events from "../core/events.mjs";
import player from "../gameObjects/player.mjs";
import UIElement from "../rendering/dom/ui/uiElement.mjs";
import { createElement } from "../util/javascript-extensions.mjs";

// const PlayerInfoRenderer = new UIElement({});

export default class PlayerInfoRenderer extends UIElement {

    static #instance;

    static {

        createElement({
            id: 'info-pane',
            parent: "ui-container-parent"
        });

        PlayerInfoRenderer.#instance = new PlayerInfoRenderer({
            name: 'PlayerInfo',
            parent: 'info-pane'
        });
    }

    constructor(options) { 

        super(options);
        this.update();

        Events.Subscribe(Events.List.ResourceChanged, this.update.bind(this));
    }

    update(options) {

        console.log(`Player has $${player.money}`);
        this.element.innerHTML = `$${player.money}`;
    }
}
