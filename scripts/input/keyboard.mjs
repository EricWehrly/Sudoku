import Events from "../core/events.mjs";
import GameOption from "../core/gameOptions.mjs";
import Grid from "../gameObjects/playfield/grid.mjs";
import Hint from "../hints/hint.mjs";

function handleKeyDown(event) {

    // event.key
    // event.keyCode
    // event.ctrlKey
    const input = parseInt(event.key);
    if(input > 0 && input < 10) {
        Events.RaiseEvent(Events.List.SudokuGuess, input);
    }

    if(event.key == 'n') {
        GameOption.NotesMode = !GameOption.NotesMode;
    }

    if(event.key == 'h') {
        const hint = Hint.get();
        hint.cell.active = true;
        Events.RaiseEvent(Events.List.SudokuGuess, hint.cell.digit);
    }

    if(event.key == 'ArrowDown') {
        const active = Grid.Grid.active;
        if(active) {
            Grid.Grid.cell(active.x, active.y + 1).active = true;
        }
    }
    
    if(event.key == 'ArrowUp') {
        const active = Grid.Grid.active;
        if(active) {
            Grid.Grid.cell(active.x, active.y - 1).active = true;
        }
    }
    
    if(event.key == 'ArrowLeft') {
        const active = Grid.Grid.active;
        if(active) {
            Grid.Grid.cell(active.x - 1, active.y).active = true;
        }
    }
    
    if(event.key == 'ArrowRight') {
        const active = Grid.Grid.active;
        if(active) {
            Grid.Grid.cell(active.x + 1, active.y).active = true;
        }
    }
}

window.addEventListener('keydown', handleKeyDown);
