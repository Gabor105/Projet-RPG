// Paladin.ts
import { Aventurier } from "./Aventurier.ts";
import { Character } from "./Character.ts";
import { Menu } from "./Menu.ts";

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
    if (!this.estVivant()) {
      console.log(`${this.nom} est K.O. et ne peut pas jouer.`);
      return;
    }

    console.log(`\n--- Tour de ${this.nom} (Paladin) ---`);
    console.log(`${this.nom} : ${this.pvActuels}/${this.pvMax} PV`);

    console.log("Ennemis :");
    for (const ennemi of ennemis) {
      console.log(
        ` - ${ennemi.nom} : ${ennemi.pvActuels}/${ennemi.pvMax} PV`,
      );
    }

    const optionsActions = [
      { label: "Attaque physique", valeur: "ATTAQUE_PHYSIQUE" },
      { label: "Attaque sainte (tous les ennemis)", valeur: "ATTAQUE_SAINTE" },
      { label: "Ne rien faire", valeur: "RIEN" },
    ];

    const menuActions = new Menu<string>(
      `Que doit faire ${this.nom} ?`,
      optionsActions,
    );

    const actionChoisie = menuActions.poserQuestion();
    console.log(`Action choisie : ${actionChoisie}`);

    const ennemisVivants = ennemis.filter((e) => e.estVivant());
    if (ennemisVivants.length === 0 && actionChoisie === "ATTAQUE_PHYSIQUE") {
      console.log("Il n'y a plus d'ennemi à attaquer !");
      return;
    }

    if (actionChoisie === "ATTAQUE_PHYSIQUE") {
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
    } else if (actionChoisie === "ATTAQUE_SAINTE") {
      this.attaqueSainte(ennemis);
    } else {
      console.log(`${this.nom} ne fait rien ce tour-ci.`);
    }
  }
}
