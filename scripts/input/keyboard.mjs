import Events from "../core/events.mjs";

function handleKeyDown(event) {

    // event.key
    // event.keyCode
    // event.ctrlKey
    const input = parseInt(event.key);
    if(input > 0 && input < 10) {
        Events.RaiseEvent(Events.List.SudokuGuess, input);
    }
}

// window.addEventListener('keydown', this.handleKeyDown.bind(this));
window.addEventListener('keydown', handleKeyDown);
