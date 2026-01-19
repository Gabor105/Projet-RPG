import { Character } from "../Character.ts";
import { Objet } from "./Objet.ts";

export class Potion extends Objet{
    override UtiliserObjet(character:Character){
        if (character.lireVieActuel() > 0){
            character.êtreSoingner(character.lireVieMaximum()*0.5);
        }
    }
}