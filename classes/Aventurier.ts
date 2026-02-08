// Aventurier.ts
import { Character } from "./Character.ts";
import { Ecrire } from "../Ecrire.ts";
import { Invantaire } from "./Invantaire.ts";
import { Menu } from "./utils/Menu.ts";
import { Choix } from "./utils/Choix.ts";

export abstract class Aventurier extends Character {
  constructor(
    nom: string,
    pvMax: number,
    attaque: number,
    defense: number,
    vitesse: number,
    pmMax: number = 0,
  ) {
    // On envoie tous les paramètres au constructeur de Character
    super(nom, pvMax, attaque, defense, vitesse, true, pmMax);
  }

  abstract jouerTour(
    ennemis: Character[],
    allies: Character[],
  ) : Promise<void> ;

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
  protected joueurFaitUnChoix(réponseAutorisées:string[], phrase:string = ""):string{
    // let retoursALaLigne = 1;
    // for (let i = 0; i < phrase.length; i++) {
    //   if (phrase[i] === '\\'){
    //     console.log(i);
    //     retoursALaLigne++;
    //   }
    // }
    // console.log(retoursALaLigne);
    if (phrase != "") new Ecrire().ecrireUnePhrase(phrase+"\n");
    let réponse : string | null = null;
    while (réponse == null) {
      réponse = prompt("Votre choix :");
      new Ecrire().effacerLigne(4);
      if (réponse != null && réponseAutorisées.includes(réponse)){
        return réponse;
      } else {
        réponse = null;
      }
    }
    return "";
  }

  protected async regarderInvantaire(){
    let recomancer = true;
    while (recomancer){
      recomancer = false;
      const choix = new Choix();
      console.log("Que veut-tu faire ?");
      const valeur = await choix.faireUnChoix(["1 - voir les objets du sac","2 - Utiliser un objet","3 - Ne rien faire"]);

      switch (valeur) {
        case 1 :
          Invantaire.instance.listeObjetInvantaire();
          recomancer = true;
          break;
        case 2 :
          await Invantaire.instance.choisirUnObjetAConsomer();
          break;
        case 3 :
          new Ecrire().ecrireUnePhrase("Bien, l'aison le temps s'écouler.");
          break;
      }
    }
  }

  protected attaquePhysique(ennemies : Character[]){
    const ennemisVivants = ennemies.filter((e) => e.estVivant());
    if (ennemisVivants.length === 0) {
      console.log("Il n'y a plus d'ennemi à attaquer !");
      return;
    }

    const optionsCibles = ennemisVivants.map((e) => ({
      label: `${e.nom} (${e.pvActuels}/${e.pvMax} PV)`,
      valeur: e,
    }));

    const menuCibles = new Menu<Character>(
      "Quel ennemi voulez-vous attaquer ?",
      optionsCibles,
    );

    const cibleChoisie = menuCibles.poserQuestion();
    this.attaqueBasique(cibleChoisie);
  }
}
