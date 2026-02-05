import { Character } from "../Character.ts";
import { Invantaire } from "../Invantaire.ts";

export class Objet{
    utiliserObjet(character:Character){
        console.log("Cette fonction ne devrais pas être appeller !");
    }

    connaitreNomObjet():string{
        console.log("Cette fonction ne devrais pas être appeller !");
        return "";
    }    
}