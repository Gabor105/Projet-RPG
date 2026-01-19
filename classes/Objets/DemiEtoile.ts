import { Objet } from "./Objet.ts";
import { Character } from "../../Character.ts";

export class DemiEtoile extends Objet {
    override utiliserObjet(character: Character): void {
        character.êtreSoingner(character.lireVieMaximum());
    }
    override connaitreNomObjet(): string {
        return "🌟 Demi-étoile";
    }
}