import { Objet } from "./Objet.ts";
import { Character } from "../../Character.ts";
import { Invantaire } from "../Invantaire.ts";

export class MorceauEtoile extends Objet {
    override utiliserObjet(character: Character, invantaire:Invantaire): void {
        if (!invantaire.objetEstDansLeSac(this)){
            console.log("Le sac est vide, vous ne pouvez pas utilisez cet objet !");
            return;
        }
        const vieActuel :number = character.lireVieActuel();
        const vieMaximum : number = character.lireVieMaximum();
        if (vieActuel <= 0){
            character.êtreSoingner(vieMaximum*0.80);
        } else {
            character.êtreSoingner(vieMaximum*0.5);
        }
        invantaire.retirerUnObjet(this);
    }
    override connaitreNomObjet(): string {
        return "✨ Morceau d'étoile";
    }
}