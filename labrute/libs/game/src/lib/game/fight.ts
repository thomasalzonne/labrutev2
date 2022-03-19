import Character from "./character";

export default class Fight{
    static MAX_TURN = 100;
    currentTurn = 0;
    constructor(private p1: Character, private p2: Character){}

    play() {
        return {
            players: [Object.assign({}, this.p1), Object.assign({}, this.p2)],
            timeline: this.generateTimeline(),
        }
    };

    generateTimeline() {
        let fightTimeline = [];
        for(let i=0; i < Fight.MAX_TURN; i++){
            this.currentTurn = i;
            fightTimeline.push(this.generateTurn());
            if(this.isFightOver()) break;
        }
        return fightTimeline;
    };

    generateTurn() {
        const fastMan = this.p1.character.speed > this.p2.character.speed ? this.p1 : this.p2;
        const slowMan = this.p1.character.speed > this.p2.character.speed ? this.p2 : this.p1;
        const attacks = [];
        if(!this.isFightOver()) attacks.push(fastMan.attack(slowMan));
        if(!this.isFightOver()) attacks.push(slowMan.attack(fastMan));
        return attacks;
    };

    isFightOver() {
        return this.p1.hp <= 0 || this.p2.hp <= 0;
    };
}