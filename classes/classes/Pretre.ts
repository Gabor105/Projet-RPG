import { Aventurier } from "../Aventurier.ts";
import { Character } from "../Character.ts";
import { Ecrire } from "../../Ecrire.ts";
import { Choix } from "../utils/Choix.ts";
import données from '../données.json' with { type: 'json' };

export class Pretre extends Aventurier{
    constructor(nom: string) {
        const a = données.Pretre;
        super(nom, a.pvMax, a.attaque, a.defense, a.vitesse, a.pmMax);
    }
    /**
     * @param allies Il s'agit de l'alié qui doit être soigner. Cela peut s'agire du joueur lui-même.
     */
    private soin(allies: Character):void{
        allies.soignerPourcentage(25);
    }
    private async actionPretre(allies: Character[]){
        if (allies.length > 0){
            let k : number = 0;
            console.log("Qui veut-tu soigner ?")
            const tableau : string[] = [];
            for (let i = 0; i < allies.length; i++) {
                tableau.push(`${i+1} - ${allies[i].nom}`);
            }
            const choix = new Choix();
            const valeur = await choix.faireUnChoix(tableau);

            this.soin(allies[valeur-1]);
        } else {
            new Ecrire().ecrireUnePhrase("Il n'y a personne à soinger... L'aison le temps s'écouler.");
        }
    }
    public override async jouerTour(ennemis: Character[], allies: Character[]): Promise<void> {
        if (!this.phraseTours()) return;
        const choix = new Choix();
        console.log("Que veut-tu faire ?");
        const valeur = await choix.faireUnChoix(["1 - soigner","2 - Attaquer","3 - Invantaire","4 - Voir les statistiques des personnages","5 - Ne rien faire"]);

        switch (valeur) {
            case 1 :
                await this.actionPretre(allies);
                break;
            case 2 :
                this.attaquePhysique(ennemis);
                break;
            case 3 :
                await this.regarderInvantaire();
                break;
            case 4 :
                this.afficherLesStatistiques();
                this.jouerTour(ennemis, allies);
                break;
            case 5:
                new Ecrire().ecrireUnePhrase("Bien, l'aison le temps s'écouler.");
                break;
        }
    }
}