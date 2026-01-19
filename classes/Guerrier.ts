// Guerrier.ts
import { Aventurier } from "./Aventurier.ts";
import { Character } from "./Character.ts";
import { Menu } from "./Menu.ts";

export class Guerrier extends Aventurier {
  constructor(nom: string) {
    super(nom, 120, 18, 8, 8);
  }

  jouerTour(ennemis: Character[], allies: Character[]): void {
    if (!this.estVivant()) {
      console.log(`${this.nom} est K.O. et ne peut pas jouer.`);
      return;
    }

    console.log(`\n--- Tour de ${this.nom} (Guerrier) ---`);
    console.log("Ennemis :");
    for (const ennemi of ennemis) {
      console.log(
        ` - ${ennemi.nom} : ${ennemi.pvActuels}/${ennemi.pvMax} PV`,
      );
    }

    const menuActions = new Menu<string>(
      `Que doit faire ${this.nom} ?`,
      [
        { label: "Attaquer un ennemi", valeur: "ATTAQUE" },
        { label: "Ne rien faire", valeur: "RIEN" },
      ],
    );

    const actionChoisie = menuActions.poserQuestion();
    console.log(`Action choisie : ${actionChoisie}`);

    if (actionChoisie === "ATTAQUE") {
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
    } else {
      console.log(`${this.nom} ne fait rien ce tour-ci.`);
    }
  }
}
