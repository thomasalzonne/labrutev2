import * as PIXI from "pixi.js";
import Character from "./character";

export default class Fight {
    constructor(game) {
        this.game = game
        this.p1 = new Character(this.game, -1, this.game.timeLine.players[0]);
        this.p2 = new Character(this.game, 1, this.game.timeLine.players[1]);
        this.players = [this.p1, this.p2];
        this.game.app.stage.addChild(this.p1.graphics);
        this.game.app.stage.addChild(this.p2.graphics);
        this.play();
    }
    async play() {
        for (const events of this.game.timeLine.timeline) { 
            for (const event of events) {
                const name = event.player;
                const player = this.players.find(p => p.player.character.name === name)
                const target = this.players.find(p => p.player.character.name !== name)
                
                await player.goToAndAttack(target, event);
            }
        }
    }
}