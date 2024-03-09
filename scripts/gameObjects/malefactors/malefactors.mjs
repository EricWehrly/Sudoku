import Events from "../../core/events.mjs";
import CellFlame from "./cellFlame.mjs"
import SquareFreeze from "./squareFreeze.mjs";

function squareCorrect(square) {

    let malefactors = Object.values(Malefactors);
    malefactors = malefactors.filter(malefactor => malefactor.activated == false);
    const index = Math.randomBetween(0, malefactors.length);
    const randomMalefactor = malefactors[index];
    
    console.log(randomMalefactor);

    if(randomMalefactor) randomMalefactor.activate();
}

Events.Subscribe(Events.List.SudokuSquareCorrect, squareCorrect);

// TODO: make a self-managing list ...
const Malefactors = {
    CellFlame,
    SquareFreeze
}

export default Malefactors;
