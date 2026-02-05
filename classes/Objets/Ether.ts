import { Objet } from "./Objet.ts";
import { Character } from "../Character.ts";
import { Invantaire } from "../Invantaire.ts";

export class Ether extends Objet {
    override utiliserObjet(character: Character): void {
        if (!Invantaire.instance.objetEstDansLeSac(this)){
            console.log("Le sac est vide, vous ne pouvez pas utilisez cet objet !");
            return;
        }
        character.augmanterPM(character.lirePMMaximum()*0.7);
        Invantaire.instance.retirerUnObjet(this.connaitreNomObjet());
    }
    override connaitreNomObjet(): string {
        return "💊 Éther";
    }
}