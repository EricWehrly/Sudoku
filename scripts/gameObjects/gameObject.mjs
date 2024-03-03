import Events from "../core/events.mjs";

export default class GameObject {

    // hack to fire AFTER inheriting constructor
    postConstruct() {
        Events.RaiseEvent(Events.List.GameObjectCreated, this);
    }
}
