import { Objet } from "./Objet.ts";
import { Character } from "../Character.ts";

export class MorceauEtoile extends Objet {
    vieActuel : number = 0;
    vieMaximum : number = 0;
    override utiliserObjet(character: Character): void {
        this.vieActuel = character.lireVieActuel();
        this.vieMaximum = character.lireVieMaximum();
        if (this.vieActuel <= 0){
            character.êtreSoingner(this.vieMaximum*0.80);
        } else {
            character.êtreSoingner(this.vieMaximum*0.5);
        }
    }
    override connaitreNomObjet(): string {
        return "✨ Morceau d'étoile";
    }
}