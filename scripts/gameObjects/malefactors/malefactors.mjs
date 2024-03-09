import Events from "../../core/events.mjs";
import CellFlame from "./cellFlame.mjs"
import SquareFreeze from "./squareFreeze.mjs";

function squareCorrect(square) {

    // do random malefactor
    // Malefactors.CellFlame.enable();
    Malefactors.SquareFreeze.enable();
}

Events.Subscribe(Events.List.SudokuSquareCorrect, squareCorrect);

// TODO: make a self-managing list ...
const Malefactors = {
    CellFlame,
    SquareFreeze
}

export default Malefactors;
