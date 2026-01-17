import { Character } from "./Character.ts";

export class Fight{
    private ennemies : Character[] = [];
    constructor(ennemie1 : Character, ennemie2 : Character, ennemie3 : Character){
        this.ennemies.push(ennemie1);
        this.ennemies.push(ennemie2);
        this.ennemies.push(ennemie3);
    }

    sélectionDePersonnage(){

    }
    structureCombats(){
        
    }
}