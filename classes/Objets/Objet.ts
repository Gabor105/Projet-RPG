import { Character } from "../Character.ts";

export class Objet{
    private pourcentageVieSiEnVie : number = 0;
    private pourcentageVieSiPasEnVie : number = 0;

    UtiliserObjet(character:Character){
        console.log("Cette fonction ne devrais pas être appeller !");
    }
}