// import { randomInt } from "node:crypto";
import { Aventurier } from "./Aventurier.ts";
// import { Menu } from "./Menu.ts";
import { Ecrire } from "../Ecrire.ts";
import { Character } from "./Character.ts";
import { CalculeProbabilitées } from "./CalculeProbabilitées.ts";
import { Invantaire } from "./Invantaire.ts";
import { Ether } from "./Objets/Ether.ts";
import { MorceauEtoile } from "./Objets/MorceauEtoile.ts";
import { DemiEtoile } from "./Objets/DemiEtoile.ts";
import { Objet } from "./Objets/Objet.ts";
import { Potion } from "./Objets/Potion.ts";
import { GameManager } from "./GameManager.ts"
import { before } from "node:test";

export class Voleur extends Aventurier {
    constructor(nom: string) {
        // nom, pvMax, attaque, defense, vitesse, pmMax, pmActuels
        super(nom, 110, 15, 9, 13);
    }

    public voler(){
        const probabilitéesNombre : number[] = [40,30,15,10,5];
        const texte =  "Le voleur à voler "
        const probabilitéPhrase : string[] = ["Le voleur n'as rien voler.", texte+"une potion !", texte+"un fragment d'étoile !", texte+"un éther !", texte+"une demi-étoile !!!"];
        const vole : number = CalculeProbabilitées.Probabilitées(probabilitéesNombre,probabilitéPhrase.length);
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
            Invantaire._instance.ajouterObjet(objet);
        }
        const classEcriture : Ecrire = new Ecrire();
        classEcriture.EcrireUnePhrase(probabilitéPhrase[vole]);
    }

    public override jouerTour(ennemis: Character[], allies: Character[]): void {
        if (!this.phraseTours()) return;
        switch (this.JoueurFaitUnChoix(["1","2","3","4","5"],"Que veut-tu faire ?\n1 - voler\n2 - Attaquer\n3 - Invantaire\n4 - Voir les statistiques des personnages\n5 - Ne rien faire")) {
            case "1" :
                this.voler();
                break;
            case "2" :
                this.attaquePhysique(ennemis);
                break;
            case "3" :
                this.regarderInvantaire();
                break;
            case "4" :
                GameManager._instance.afficherLesStatistiques();
                this.jouerTour(ennemis, allies);
                break;
            case "5":
                new Ecrire().EcrireUnePhrase("Bien, l'aison le temps s'écouler.");
                break;
        }
    }
}