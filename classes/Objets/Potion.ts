import { error } from "node:console";
import { Character } from "../../Character.ts";
import { Invantaire } from "../Invantaire.ts";
import { Objet } from "./Objet.ts";

export class Potion extends Objet{
    override utiliserObjet(character:Character, invantaire:Invantaire){
        if (!invantaire.objetEstDansLeSac(this)){
            console.log("Le sac est vide, vous ne pouvez pas utilisez cet objet !");
            return;
        }
        if (character.lireVieActuel() > 0){
            character.êtreSoingner(character.lireVieMaximum()*0.5);
            invantaire.retirerUnObjet(this);
        }
    }
    override connaitreNomObjet(): string {
        return "🧪 Potion";
    }
}