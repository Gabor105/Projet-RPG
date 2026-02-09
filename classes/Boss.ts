import {Monstre} from "./Monstre.ts";
import données from './données.json' with { type: 'json' };
import { Aventurier } from "./Aventurier.ts";

export class Boss extends Monstre{
    constructor(){
        const a = données.Boss;
        super(a.nom, a.pvMax, a.attaque, a.defense, a.vitesse, a.pmMax);
    }

    override jouerTour(cibles: Aventurier[]): void {    
        if (Math.floor(Math.random() * 101) <= 70){
            super.jouerTour(cibles);
        } else {
            this.attaqueDeGroupe(cibles);
        }
    }

    attaqueDeGroupe(cibles: Aventurier[]): void {    
        console.log("Le boss utilise son attaque de zonne !");
        for (let i = 0; i < cibles.length; i++) {
            this.attaqueBasique(cibles[i]);
        }
    }
}