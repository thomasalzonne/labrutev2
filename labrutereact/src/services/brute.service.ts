import axios from 'axios'
import { BehaviorSubject } from 'rxjs';
import Brutes from '../models/brutes';
import authService from './auth.service';

class BruteService {
    brutes: BehaviorSubject<Brutes[]> = new BehaviorSubject<Brutes[]>([])
    brutestofight: BehaviorSubject<Brutes[]> = new BehaviorSubject<Brutes[]>([])
    mybrute = new BehaviorSubject(null)
    opponent = new BehaviorSubject(null)
    fight = new BehaviorSubject(null)

    constructor(){
        this.getBrutes()
    }
    
    generateCharacter(values) {
        const user = authService.getUser()
        axios.post("/character/generate", {
          name: values.name,
          user: user.value,
        }).then(() => this.getBrutes());
    }

    getBrutes() {
        axios.get("/characters")
        .then((res) => this.brutes.next(res.data))
    }

    getBrutesToFight(){
        axios.get("/characters/tofight")
        .then((res) => this.brutestofight.next(res.data))
    }

    getFight(){
        axios.get("/fight/"+this.mybrute.value.id+"/"+this.opponent.value.id)
        .then(e => this.fight.next(e.data))
    }
}

export default new BruteService()