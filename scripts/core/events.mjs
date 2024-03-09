import { generateId } from "../util/javascript-extensions.mjs"

// TODO: extends Listed
export default class Events {

    static List = {
        'GameStart': 'GameStart',
        'GameObjectCreated': 'GameObjectCreated',
        'CellActive': 'CellActive',
        'SudokuGuess': 'SudokuGuess',
        'SudokuGuessCorrect': 'SudokuGuessCorrect',
        'SudokuGuessWrong': 'SudokuGuessWrong',
        'SudokuSquareCorrect': 'SudokuSquareCorrect',
        'EffectAdded': 'EffectAdded',
        'EffectRemoved': 'EffectRemoved'
    };

    static #Subscriptions = {};

    static #FiredEvents = {};

    static Context = {};

    static Subscribe(eventNames, callback, options) {

        // TODO: check inputs for bad values

        if (Array.isArray(eventNames)) {
            eventNames.forEach(function (eventName) {
                Events.#subscribe(eventName, callback, options);
            });
        } else {
            return Events.#subscribe(eventNames, callback, options);
        }
    }

    /**
     * 
     * @param {String} eventName The enum name from Events.List
     * @param {Object} detail The details of the event (usually the subject of the action). Varies by event type.
     * @param {Object} options 
     * @param {Boolean} options.removeAfterRaise Whether to de-register the event after the first time that it is raised, preventing subsequent calls from resulting in a raised event.
     * @param {Boolean} options.finalFire This is the last time the event will fire. All registrations after will fire immediately.
     */
    static RaiseEvent(eventName, detail, options) {

        if(options?.finalFire == true) {
            if(eventName in Events.#FiredEvents) {
                console.warn(`${eventName} already called finalFire`);
            }

            Events.#FiredEvents[eventName] = {
                detail,
                options
            };
        }

        var subscribedEvents = Events.#Subscriptions[eventName];
        if (!subscribedEvents) return;   // handle no subscriptions
        subscribedEvents = subscribedEvents.slice(0)   // create an unmodified copy, to survive modifications

        for (var subscription of subscribedEvents) {
            Events.Context = detail;
            Events.#raiseSubscription(subscription.callback, {
                detail,
                eventName
            });

            if (subscription.oneTime || options?.removeAfterRaise == true) {
                console.warn("Didn't implement unsubscribe ...");
                // Events.Unsubscribe(subscription.subscriptionId);
            }
        }
        Events.Context = {};
    }

    /**
     * @param {Function} callback The callback method of the subscriber.
     * @param {Object} options.detail The details of the event (usually the subject of the action). Varies by event type.
     * @param {String} options.eventName From Events.List
     */
    static #raiseSubscription(callback, options) {

        try {
            callback(options.detail);
        } catch (ex) {
            if(options.eventName) console.error(`Issue firing subscription for event ${options.eventName}`);
            if (callback.name != "") {
                console.log(callback.name);
            }
            console.error(ex);
            debugger;
        }
    }

    // Unsubscribe

    // subscribeOnce

    /**
     * @param {*} eventName 
     * @param {*} callback 
     * @param {*} options 
     * @returns the id of the subscription if successful
     * @returns null if the event has already fired for the last time
     * but in that case it fires the subscription immediately
     */
    static #subscribe(eventName, callback, options) {

        if(eventName == undefined) debugger;
        
        if (eventName in Events.#FiredEvents) {
            console.debug(`Immediately firing subscription for already fired event ${eventName}.`);
            const firedEvent = Events.#FiredEvents[eventName];
            Events.#raiseSubscription(callback, {
                eventName,
                ...firedEvent
            });
            return null;
        }

        const subscriptionId = generateId();

        if (!(eventName in Events.#Subscriptions)) Events.#Subscriptions[eventName] = [];
        var length = Events.#Subscriptions[eventName].push({
            "subscriptionId": subscriptionId,
            "callback": callback
        });
        // these options are not used
        if (options) Object.assign(Events.#Subscriptions[eventName][length - 1], options);

        Events.#Subscriptions[eventName].sort(Events.#sortEventsArray);

        return subscriptionId;
    };

    static #sortEventsArray(first, second) {

        if (first.before && second.callback.name && second.callback.name == first.before) {
            return -1;
        }
        if (second.before && first.callback.name && first.callback.name == second.before) {
            return 1;
        }

        if (first.priority > second.priority) return -1;
        else if (second.priority > first.priority) return 1;
        return 0;
    }
}

if(typeof window != 'undefined') window.Events = Events;
