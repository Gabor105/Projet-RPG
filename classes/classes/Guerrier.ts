// Guerrier.ts
import { Aventurier } from "../Aventurier.ts";
import { Character } from "../Character.ts";
import { Menu } from "../utils/Menu.ts";
import données from '../données.json' with { type: 'json' };

export class Guerrier extends Aventurier {
  constructor(nom: string) {
    const a = données.Guerrier;
    super(nom, a.pvMax, a.attaque, a.defense, a.vitesse, a.pmMax);
  }

  public override async jouerTour(ennemis: Character[], allies: Character[]): Promise<void> {
    if (!this.phraseTours()) return;
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
        { label: "Invantaire", valeur:"INVANTAIRE"},
        { label: "Voir les statistiques des personnages", valeur:"STATISTIQUE"},
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
    } else if (actionChoisie === "INVANTAIRE") { 
      await this.regarderInvantaire();
    } else if (actionChoisie === "STATISTIQUE") { 
      this.afficherLesStatistiques();
      this.jouerTour(ennemis, allies);
    } else {
      console.log(`${this.nom} ne fait rien ce tour-ci.`);
    }
  }
}
