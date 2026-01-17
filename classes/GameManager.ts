import { Fight } from "./Fight.ts";
import { SalleBoss } from "./SalleBoss.ts";
import { SalleCoffre } from "./SalleCoffre.ts";

export class GameManager{
    private salleCombat : Fight[] = [];//il y en auras 2
    private salleCoffre : SalleCoffre[] = [];//il y en auras 2
    private salleBoss : SalleBoss;
    constructor (salleCombat1 : Fight, salleCombat2 : Fight, salleCoffre1 : SalleCoffre, salleCoffre2 : SalleCoffre, salleBoss : SalleBoss){
        this.salleCombat.push(salleCombat1);
        this.salleCombat.push(salleCombat2);
        this.salleCoffre.push(salleCoffre1);
        this.salleCoffre.push(salleCoffre2);
        this.salleBoss = salleBoss;
    }
}