import { useObservable } from "react-use";
import bruteService from "../services/brute.service.ts";
import Game from '../game/game'

export default function Fight() {
    const fight = useObservable(bruteService.fight)
    new Game(fight)
    return(
        <div class="fight">
            <div style="position:absolute; z-index: 1">alo</div>
        </div>
    )
}