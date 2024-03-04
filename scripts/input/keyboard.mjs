import Events from "../core/events.mjs";
import GameOption from "../core/gameOptions.mjs";

function handleKeyDown(event) {

    // event.key
    // event.keyCode
    // event.ctrlKey
    const input = parseInt(event.key);
    if(input > 0 && input < 10) {
        Events.RaiseEvent(Events.List.SudokuGuess, input);
    }

    if(event.key == 'n') {
        GameOption.HintMode = !GameOption.HintMode;
    }
}

// window.addEventListener('keydown', this.handleKeyDown.bind(this));
window.addEventListener('keydown', handleKeyDown);
