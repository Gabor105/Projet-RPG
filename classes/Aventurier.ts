// Aventurier.ts
import { Character } from "./Character.ts";
import { Ecrire } from "../Ecrire.ts";
import { Invantaire } from "./Invantaire.ts";

export abstract class Aventurier extends Character {
  constructor(
    nom: string,
    pvMax: number,
    attaque: number,
    defense: number,
    vitesse: number,
    pmMax: number = 0,
    pmActuels: number = 0,
  ) {
    // On envoie tous les paramètres au constructeur de Character
    super(nom, pvMax, attaque, defense, vitesse, true, pmMax, pmActuels);
  }

  abstract jouerTour(
    ennemis: Character[],
    allies: Character[],
  ): void;

  protected phraseTours():boolean{
    console.log("");
    if (!this.estVivant()) {
      console.log(`${this.nom} est K.O. et ne peut pas jouer.`);
      return false;
    } 
    console.log(`\n--- Tour de ${this.nom} ---`);
    return true;
  }

  /**
   * @param réponseAutorisées La liste des réponse autorisées.
   * @param phrase La phrasse qui dit se qui est attendu (facultatif).
   * @returns la réponse choisie.
  */
  protected JoueurFaitUnChoix(réponseAutorisées:string[], phrase:string = ""):string{
    // let retoursALaLigne = 1;
    // for (let i = 0; i < phrase.length; i++) {
    //   if (phrase[i] === '\\'){
    //     console.log(i);
    //     retoursALaLigne++;
    //   }
    // }
    // console.log(retoursALaLigne);
    if (phrase != "") new Ecrire().EcrireUnePhrase(phrase+"\n");
    let réponse : string | null = null;
    while (réponse == null) {
      réponse = prompt("Votre choix :");
      new Ecrire().EffacerLigne(4);
      if (réponse != null && réponseAutorisées.includes(réponse)){
        return réponse;
      } else {
        réponse = null;
      }
    }
    return "";
  }

  protected regarderInvantaire():void{
    let recomancer = true;
    while (recomancer){
      recomancer = false;
      switch (this.JoueurFaitUnChoix(["1","2","3"],"Que veut-tu faire ?\n1 - voir les objets du sac\n2 - Utiliser un objet\n3 - Ne rien faire")) {
        case "1" :
          Invantaire.instance.listeObjetInvantaire();
          recomancer = true;
          break;
        case "2" :
          Invantaire.instance.choisirUnObjetAConsomer();
          break;
        case "3" :
          new Ecrire().EcrireUnePhrase("Bien, l'aison le temps s'écouler.");
          break;
      }
    }
  }
}
