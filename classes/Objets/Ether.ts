import { Objet } from "./Objet.ts";
import { Character } from "../../Character.ts";

export class Ether extends Objet {
    override utiliserObjet(character: Character): void {
        character.augmanterPM(character.lirePMMaximum()*0.7);
    }
    override connaitreNomObjet(): string {
        return "💊 Éther";
    }
}