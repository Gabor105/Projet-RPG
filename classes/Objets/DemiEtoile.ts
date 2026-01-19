import { Objet } from "./Objet.ts";
import { Character } from "../Character.ts";

export class DemiEtoile extends Objet {
    override UtiliserObjet(character: Character): void {
        character.êtreSoingner(character.lireVieMaximum());
    }
}