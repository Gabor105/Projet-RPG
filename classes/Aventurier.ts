// Aventurier.ts
import { format } from "node:path";
import { Character } from "./Character.ts";
import { Ecrire } from "../Ecrire.ts";

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
    if (phrase != "") new Ecrire().EcrireUnePhrase(phrase+"\n");
    let réponse : string | null = null;
    while (réponse == null) {
      réponse = prompt("Votre choix :");
      if (réponse != null && réponseAutorisées.includes(réponse)){
        return réponse;
      } else {
        réponse = null;
      }
    }
    return "";
  }
}
