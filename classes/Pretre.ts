import { Aventurier } from "./Aventurier.ts";

export class Pretre extends Aventurier{
    constructor(nom: string) {
        // nom, pvMax, attaque, defense, vitesse, pmMax, pmActuels
        super(nom, 110, 4, 6, 8);
    }
}