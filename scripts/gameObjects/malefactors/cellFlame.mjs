import Effect from "../effects/effect.mjs";
import Malefactor from "./malefactor.mjs";

const CellFlame = new Malefactor({
    name: 'CellFlame',
    effect: new Effect('Aflame')
});

export default CellFlame;
