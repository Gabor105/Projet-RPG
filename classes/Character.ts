import { Classes } from "../ENUM/Classes.ts";

export class Character {
    private classes : Classes = Classes.Guerrier;
    private pM:number = 100;
    private nom:string = "";
    private force:number = 100;
    private défance:number = 100;
    private vitesse:number = 100;
    private pVMax:number = 100;
    private pV:number=100;

    constructor (classes : Classes, pM:number, nom:string, force:number, défance:number, vitesse:number, pVMax:number, pV:number){
        this.classes = classes;
        this.pM = pM;
        this.nom = nom;
        this.force = force;
        this.défance = défance;
        this.vitesse = vitesse;
        this.pVMax = pVMax;
        this.pV = pV;
    }

    public attaque() {
        
    }
    public êtreSoingner() {
        
    }
    public êtreRésucité() {
        
    }
    public jouerToursFight() {
        
    }
}