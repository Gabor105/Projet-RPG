// Mage.ts
import { Aventurier } from "./Aventurier.ts";
import { Character } from "./Character.ts";
import { Menu } from "./Menu.ts";

export class Mage extends Aventurier {
  pmMax: number;
  pmActuels: number;
  coutSort: number;

  constructor(nom: string) {
    super(nom, 80, 8, 3, 10);
    this.pmMax = 50;
    this.pmActuels = 50;
    this.coutSort = 10;
  }

  private attaqueMagique(cible: Character): void {
    if (this.pmActuels < this.coutSort) {
      console.log(`${this.nom} n'a pas assez de PM pour lancer un sort.`);
      return;
    }

    this.pmActuels -= this.coutSort;

    const degats = this.attaque * 2;
    console.log(
      `${this.nom} lance un sort sur ${cible.nom} et inflige ${degats} dégâts magiques !`,
    );

    cible.pvActuels = Math.max(0, cible.pvActuels - degats);
    console.log(
      `${cible.nom} a maintenant ${cible.pvActuels}/${cible.pvMax} PV.`,
    );
  }

  jouerTour(ennemis: Character[], allies: Character[]): void {
    if (!this.estVivant()) {
      console.log(`${this.nom} est K.O. et ne peut pas jouer.`);
      return;
    }

    console.log(`\n--- Tour de ${this.nom} (Mage) ---`);
    console.log(
      `${this.nom} : ${this.pvActuels}/${this.pvMax} PV, ${this.pmActuels}/${this.pmMax} PM`,
    );

    console.log("Ennemis :");
    for (const ennemi of ennemis) {
      console.log(
        ` - ${ennemi.nom} : ${ennemi.pvActuels}/${ennemi.pvMax} PV`,
      );
    }

    const optionsActions = [
      { label: "Attaque physique", valeur: "ATTAQUE_PHYSIQUE" },
      { label: "Attaque magique (coût 10 PM)", valeur: "ATTAQUE_MAGIQUE" },
      { label: "Ne rien faire", valeur: "RIEN" },
    ];

    const menuActions = new Menu<string>(
      `Que doit faire ${this.nom} ?`,
      optionsActions,
    );

    const actionChoisie = menuActions.poserQuestion();
    console.log(`Action choisie : ${actionChoisie}`);

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
      "Quelle cible voulez-vous attaquer ?",
      optionsCibles,
    );

    if (actionChoisie === "ATTAQUE_PHYSIQUE") {
      const cibleChoisie = menuCibles.poserQuestion();
      this.attaqueBasique(cibleChoisie);
    } else if (actionChoisie === "ATTAQUE_MAGIQUE") {
      const cibleChoisie = menuCibles.poserQuestion();
      this.attaqueMagique(cibleChoisie);
    } else {
      console.log(`${this.nom} ne fait rien ce tour-ci.`);
    }
  }
}
