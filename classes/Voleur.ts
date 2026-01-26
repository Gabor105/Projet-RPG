// import { randomInt } from "node:crypto";
import { Aventurier } from "./Aventurier.ts";
// import { Menu } from "./Menu.ts";
import { Ecrire } from "../Ecrire.ts";
import { Character } from "./Character.ts";
import { CalculeProbabilitées } from "./CalculeProbabilitées.ts";


export class Voleur extends Aventurier {
    constructor(nom: string) {
        // nom, pvMax, attaque, defense, vitesse, pmMax, pmActuels
        super(nom, 110, 15, 9, 13);
    }

    public voler(){
        const probabilitéesNombre : number[] = [40,30,15,10,5];
        const texte =  "Le voleur à voler "
        const probabilitéPhrase : string[] = ["Le voleur n'as rien voler.", texte+"une potion !", texte+"un fragment d'étoile !", texte+"un éther !", texte+"une demi-étoile !!!"];
        const classEcriture : Ecrire = new Ecrire();
        classEcriture.EcrireUnePhrase(probabilitéPhrase[CalculeProbabilitées.Probabilitées(probabilitéesNombre,probabilitéPhrase.length)]);

        // const probabilitéesNombre : number[] = [40,30,15,10,5];
        // let total : number = 0;
        // for (let k of probabilitéesNombre) {
        //     total += k
        // }
        // const probabilité = randomInt(total);
        // const probabilitéPhrase : string[] = ["Le voleur n'as rien voler.", texte+"une potion !", texte+"un fragment d'étoile !", texte+"un éther !", texte+"une demi-étoile !!!"];
        // const classEcriture : Ecrire = new Ecrire();

        // for (let i = 0; i < probabilitéesNombre.length; i++) {
        //     if (probabilitéPhrase.length>i){
        //         if (probabilité < probabilitéesNombre[i]){
        //             classEcriture.EcrireUnePhrase(probabilitéPhrase[i]);
        //         }
        //     }
        // }

    }

    public override jouerTour(ennemis: Character[], allies: Character[]): void {
        this.voler();
    }
}