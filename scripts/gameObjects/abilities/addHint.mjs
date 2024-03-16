import Hint from "../../hints/hint.mjs";
import Ability from "./ability.mjs";

const addHint = function() {

    Hint.count++;
}

const AddHint = new Ability({
    name: 'Add Hint',
    callback: addHint
});

export default AddHint;
