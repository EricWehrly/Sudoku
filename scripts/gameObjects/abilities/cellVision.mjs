import AbilityAction from "./abilityAction.mjs";
import Grid from "../playfield/grid.mjs";

function shouldHighlight(activeCell, targetCell, abilityLevel) {

    if(abilityLevel > 0
        && (activeCell.x == targetCell.x || activeCell.y == targetCell.y)){
            return true;
    }

    if(abilityLevel > 1
        && targetCell.known
        && (activeCell.digit == targetCell.digit)){
            return true;
    }

    return false;
}

function visionCallback(options) {

   const { ability, cell } = options;
   if(ability.level > 0) {
        Grid.Grid.cells.forEach(function highlight(gridCell) {
            if(gridCell.active) return;
            gridCell.highlight = shouldHighlight(cell, gridCell, ability.level);
        });
   }
}

const ability = new AbilityAction({
    name: 'Enhanced Cell Vision',
    callback: visionCallback
});

export default ability;
