import { proba } from "../utils";
import { IWeapon } from "./weapon";

export interface ICharacter {
    maxpoint: number;
    name: string;
    level: number;
    strength: number;
    agility: number;
    speed: number;
    vitality: number;
    defence: number;
    weapons: any[];
    pets: any[];
    masteries: any[];
}

export default class Character {
    static MAX_DODGE = 50;
    static BASE_HP = 35;
    private weaponEquiped?:IWeapon;
    public hp!: number;
    constructor(public character: ICharacter) {
        this.character.weapons = this.character.weapons || []
        this.character.pets = this.character.pets || []
        this.hp = Character.BASE_HP + (this.character.vitality * 2)
    }

    static generate(name: string): ICharacter{
        return {
            name: name,
            maxpoint: 12,
            level: 1,
            agility: Math.floor(Math.random() * 5) + 1,
            speed: Math.floor(Math.random() * 5) + 1,
            strength: Math.floor(Math.random() * 5) + 1,
            vitality: Math.floor(Math.random() * 5) + 1,
            defence: Math.floor(Math.random() * 5) + 1,
            weapons: [],
            masteries: [],
            pets: [],
        }
    }
    attack(target: Character){
        const attack : any = {};
        //proba sortir arme 50%
        //si vrai sortir arme
        if(this.character.weapons.length > 0 && proba(50)){
            this.weaponEquiped = this.character.weapons.shift();
            attack.weapon = this.weaponEquiped;
        }
        //calcul dégats
        //calcul défense
        const stats = this.getStats();
        let damage =  Math.round((((this.character.level * 5 + 2) * stats.strength)/(target.character.defence * 3)) + 2);

        //calcul esquive
        let dodge = ((target.getStats().agility + target.getStats().speed) - (stats.agility + stats.speed)) * 5;
        dodge = dodge > Character.MAX_DODGE ? Character.MAX_DODGE : dodge;
        dodge = dodge < 0 ? 0 : dodge;
        const isDodged = proba(dodge);
        attack.dodge = isDodged;

        //coup critique
        let criticalStrike = ((stats.agility + stats.strength) - (target.character.defence + target.character.speed))*5;
        const isCrit = proba(criticalStrike);
        attack.criticalStrike = isCrit;
        if(isCrit) damage = Math.ceil(damage * 1.3+(stats.strength*0.05));
        attack.damage = damage;
        //calcul contre attaque insh'allah un jour
        //taper
        if(!isDodged){
            target.hp -= damage;
        }
        attack.player = this.character.name;
        //return faits de jeux
        return attack;
    }

    getStats() {
        return {
            agility : (this.weaponEquiped?.agility || 0 )+ this.character.agility,
            strength : (this.weaponEquiped?.strength || 0) + this.character.strength,
            speed : (this.weaponEquiped?.speed || 0) + this.character.speed,
        }
    }
}