// Paladin.ts
import { Aventurier } from "./Aventurier.ts";
import { Character } from "./Character.ts";
import { Menu } from "./Menu.ts";
import { Ecrire } from "../Ecrire.ts";

export class Paladin extends Aventurier {
  constructor(nom: string) {
    // nom, pvMax, attaque, defense, vitesse, pmMax, pmActuels
    // Stats : attaque moins élevée que Guerrier (18), défense plus élevée (10)
    super(nom, 110, 14, 10, 8);
  }

  private attaqueSainte(cibles: Character[]): void {
    console.log(`${this.nom} lance une attaque sainte sur tous les ennemis !`);

    const ciblesVivantes = cibles.filter((c) => c.estVivant());

    if (ciblesVivantes.length === 0) {
      console.log("Il n'y a plus d'ennemi à attaquer !");
      return;
    }

    // Attaque sainte : 40% des dégâts physiques sur chaque cible
    for (const cible of ciblesVivantes) {
      const degatsPhysiques = Math.max(0, this.attaque - cible.defense);
      const degatsAttaqueSainte = Math.floor(degatsPhysiques * 0.4);

      console.log(
        `${cible.nom} subit ${degatsAttaqueSainte} dégâts magiques saintes.`,
      );

      cible.pvActuels = Math.max(0, cible.pvActuels - degatsAttaqueSainte);
      console.log(
        `${cible.nom} a maintenant ${cible.pvActuels}/${cible.pvMax} PV.`,
      );
    }
  }

  jouerTour(ennemis: Character[], allies: Character[]): void {
    if (!this.phraseTours()) return;
    
    switch (this.JoueurFaitUnChoix(["1","2", "3"],"Que veut-tu faire ?\n1 - Attaque physique \n2 - Attaque sainte (tous les ennemis)\n3 - Ne rien faire")) {
      case "1" :
        this.attaquePhysique(ennemis);
        break;
      case "2" :
        this.attaqueSainte(ennemis);
        break;
      case "3":
        new Ecrire().EcrireUnePhrase("Bien, l'aison le temps s'écouler.");
        break;
    }
  }

  attaquePhysique(ennemis: Character[]){
    const ennemisVivants = ennemis.filter((e) => e.estVivant());
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
