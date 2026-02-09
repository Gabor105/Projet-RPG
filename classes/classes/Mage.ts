// Mage.ts
import { Aventurier } from "../Aventurier.ts";
import { Character} from "../Character.ts";
import { Menu } from "../utils/Menu.ts";
import données from '../données.json' with { type: 'json' };

export class Mage extends Aventurier {

  constructor(nom: string) {
    const a = données.Mage;
    super(nom, a.pvMax, a.attaque, a.defense, a.vitesse, a.pmMax);
    this.coutSort = 10;
  }

  public override async jouerTour(ennemis: Character[], allies: Character[]): Promise<void> {
    if (!this.phraseTours()) return;
  
    const optionsActions = [
      { label: "Attaque physique", valeur: "ATTAQUE_PHYSIQUE" },
      { label: "Attaque magique (coût 10 PM)", valeur: "ATTAQUE_MAGIQUE" },
      { label: "Invantaire", valeur:"INVANTAIRE"},
      { label: "Voir les statistiques des personnages", valeur:"STATISTIQUE"},
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
