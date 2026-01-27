import { Aventurier } from "./Aventurier.ts";
import { Character } from "./Character.ts";
import { Ecrire } from "../Ecrire.ts";
import { GameManager } from "./GameManager.ts";

export class Pretre extends Aventurier{
    constructor(nom: string) {
        // nom, pvMax, attaque, defense, vitesse, pmMax, pmActuels
        super(nom, 110, 4, 6, 8);
    }
    /**
     * @param allies Il s'agit de l'alié qui doit être soigner. Cela peut s'agire du joueur lui-même.
     */
    private soin(allies: Character):void{
        allies.soignerPourcentage(25);
    }
    private actionPretre(allies: Character[]){
        if (allies.length > 0){
            let k : number = 0;
            console.log("Qui veut-tu soigner ?")
            for (let i = 0; i < allies.length; i++) {
                console.log(`${i+1} - ${allies[i].nom}`);
            }
            let réponse :string | null = null;
            while (!réponse){
                let trouver : boolean = false;
                réponse = prompt("Écrit le numéro de celui qui tu shouaite soigner :");
                if (réponse){
                    for (let i = 0; i < allies.length; i++) {
                        if (i.toString() === réponse){
                            k = i;
                            trouver = true;
                        }
                    }
                }
                if (!trouver){
                    réponse = null;
                }
            }
            this.soin(allies[k]);
        } else {
            new Ecrire().EcrireUnePhrase("Il n'y a personne à soinger... L'aison le temps s'écouler.");
        }
    }
    public override jouerTour(ennemis: Character[], allies: Character[]): void {
        if (!this.phraseTours()) return;
        
        if (!this.phraseTours()) return;
        switch (this.JoueurFaitUnChoix(["1","2","3","4","5"],"Que veut-tu faire ?\n1 - soigner\n2 - Attaquer\n3 - Invantaire\n4 - Voir les statistiques des personnages\n5 - Ne rien faire")) {
            case "1" :
                this.actionPretre(allies);
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