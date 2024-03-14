import Player from "../player.mjs";
import Ability from "./ability.mjs";

const getMoney = function() {

    Player.money += 15;
}

const GetMoney = new Ability({
    name: 'Get Money',
    callback: getMoney
});

export default GetMoney;
