import Events from "../core/events.mjs";

export default class GameObject {

    renderer = {
        update() { }
    }

    #visible = true;
    get visible() { return this.#visible; }
    set visible(value) { 
        this.#visible = value;
        this.renderer.update();
    }
    hide() {
        this.#visible = false;
        this.renderer.update();
    }
    show() {
        this.#visible = true;
        this.renderer.update();  
    }

    // hack to fire AFTER inheriting constructor
    postConstruct() {
        Events.RaiseEvent(Events.List.GameObjectCreated, this);
    }
}
