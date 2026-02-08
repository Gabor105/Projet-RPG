// import { randomInt } from "node:crypto";
import { Aventurier } from "../Aventurier.ts";
// import { Menu } from "./Menu.ts";
import { Ecrire } from "../../Ecrire.ts";
import { Character } from "../Character.ts";
import { CalculeProbabilitées } from "../utils/CalculeProbabilitées.ts";
import { Invantaire } from "../Invantaire.ts";
import { Ether } from "../Objets/Ether.ts";
import { MorceauEtoile } from "../Objets/MorceauEtoile.ts";
import { DemiEtoile } from "../Objets/DemiEtoile.ts";
import { Objet } from "../Objets/Objet.ts";
import { Potion } from "../Objets/Potion.ts";
import { GameManager } from "../gestion-du-jeu/GameManager.ts"
import { Choix } from "../utils/Choix.ts";
import données from '../données.json' with { type: 'json' };

export class Voleur extends Aventurier {
    constructor(nom: string) {
        const a = données.Voleur;
        super(nom, a.pvMax, a.attaque, a.defense, a.vitesse, a.pmMax);
    }

    public voler(){
        const probabilitéesNombre : number[] = [40,30,15,10,5];
        const texte =  "Le voleur à voler "
        const probabilitéPhrase : string[] = ["Le voleur n'as rien voler.", texte+"une potion !", texte+"un fragment d'étoile !", texte+"un éther !", texte+"une demi-étoile !!!"];
        const vole : number = CalculeProbabilitées.probabilitées(probabilitéesNombre,probabilitéPhrase.length);
        let objet : Objet | null = null;
        switch (vole) {
            case 1:
                objet = new Potion();
                break;
            case 2:
                objet = new MorceauEtoile();
                break;
            case 3:
                objet = new Ether();
                break;
            case 4:
                objet = new DemiEtoile();
                break;
        }
        if (objet != null){
            Invantaire.instance.ajouterObjet(objet);
        }
        const classEcriture : Ecrire = new Ecrire();
        classEcriture.ecrireUnePhrase(probabilitéPhrase[vole]);
    }

    public override async jouerTour(ennemis: Character[], allies: Character[]) : Promise<void>{
        if (!this.phraseTours()) return;
        const choix = new Choix();
        console.log("Que veut-tu faire ?");
        const valeur = await choix.faireUnChoix(["1 - voler","2 - Attaquer","3 - Invantaire","4 - Voir les statistiques des personnages","5 - Ne rien faire"]);

        switch (valeur) {
            case 1 :
                this.voler();
                break;
            case 2 :
                this.attaquePhysique(ennemis);
                break;
            case 3 :
                await this.regarderInvantaire();
                break;
            case 4 :
                GameManager.instance.afficherLesStatistiques();
                await this.jouerTour(ennemis, allies);
                break;
            case 5:
                new Ecrire().ecrireUnePhrase("Bien, l'aison le temps s'écouler.");
                break;
        }
    }
}