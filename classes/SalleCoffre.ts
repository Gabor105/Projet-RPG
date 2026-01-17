import { Objet } from "../ENUM/Objet.ts";

export class SalleCoffre{
    private piège : boolean = false;
    private objet:Object[] = [];
    constructor (piège:boolean, objet1 : Object| null = null, objet2 : Object| null = null){
        this.piège = piège;
        if (objet1 != null) {
            this.objet.push(objet1);
        }
        if (objet2 != null) {
            this.objet.push(objet2);
        }
    }
}