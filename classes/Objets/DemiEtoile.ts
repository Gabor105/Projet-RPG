import { Objet } from "./Objet.ts";
import { Character } from "../../Character.ts";
import { Invantaire } from "../Invantaire.ts";

export class DemiEtoile extends Objet {
    override utiliserObjet(character: Character, invantaire:Invantaire): void {
        if (!invantaire.objetEstDansLeSac(this)){
            console.log("Le sac est vide, vous ne pouvez pas utilisez cet objet !");
            return;
        }
        character.êtreSoingner(character.lireVieMaximum());
        invantaire.retirerUnObjet(this);
    }
    override connaitreNomObjet(): string {
        return "🌟 Demi-étoile";
    }
}