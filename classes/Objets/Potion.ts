import { Character } from "../Character.ts";
import { Invantaire } from "../Invantaire.ts";
import { Objet } from "./Objet.ts";

export class Potion extends Objet{
    override utiliserObjet(character:Character){
        if (!Invantaire.instance.objetEstDansLeSac(this)){
            console.log("Le sac est vide, vous ne pouvez pas utilisez cet objet !");
            return;
        }
        if (character.lireVieActuel() > 0){
            character.êtreSoingner(character.lireVieMaximum()*0.5);
            Invantaire.instance.retirerUnObjet(this.connaitreNomObjet());
        }
    }
    override connaitreNomObjet(): string {
        return "🧪 Potion";
    }
}