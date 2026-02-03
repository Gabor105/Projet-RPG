// Barbare.ts
import { Aventurier } from "../Aventurier.ts";
import { Character } from "../Character.ts";
import { Menu } from "../Menu.ts";

export class Barbare extends Aventurier {
  constructor(nom: string) {
    // nom, pvMax, attaque, defense, vitesse, pmMax, pmActuels
    // Stats : attaque très élevée (22), défense faible (4)
    super(nom, 130, 22, 4, 8);
  }

  private berserk(cibles: Character[]): void {
    const ciblesVivantes = cibles.filter((c) => c.estVivant());

    if (ciblesVivantes.length === 0) {
      console.log("Il n'y a plus d'ennemi à attaquer !");
      return;
    }

    // Choisir une cible au hasard
    const indexCible = Math.floor(Math.random() * ciblesVivantes.length);
    const cible = ciblesVivantes[indexCible];

    // Berserk : 130% des dégâts physiques
    const degatsPhysiques = Math.max(0, this.attaque - cible.defense);
    const degatsBerserk = Math.floor(degatsPhysiques * 1.3);

    console.log(
      `${this.nom} entre en Berserk et attaque ${cible.nom} pour ${degatsBerserk} dégâts !`,
    );

    cible.pvActuels = Math.max(0, cible.pvActuels - degatsBerserk);
    console.log(
      `${cible.nom} a maintenant ${cible.pvActuels}/${cible.pvMax} PV.`,
    );

    // Le Barbare se blesse de 20% de ses PV max
    const degatAutoInfliges = Math.floor(this.pvMax * 0.2);
    console.log(
      `${this.nom} se blesse lui-même de ${degatAutoInfliges} PV en entrant en Berserk !`,
    );

    this.pvActuels = Math.max(0, this.pvActuels - degatAutoInfliges);
    console.log(
      `${this.nom} a maintenant ${this.pvActuels}/${this.pvMax} PV.`,
    );
  }

  public override async jouerTour(ennemis: Character[], allies: Character[]): Promise<void> {
    if (!this.phraseTours()) return;
    
    console.log(`${this.nom} : ${this.pvActuels}/${this.pvMax} PV`);

    console.log("Ennemis :");
    for (const ennemi of ennemis) {
      console.log(
        ` - ${ennemi.nom} : ${ennemi.pvActuels}/${ennemi.pvMax} PV`,
      );
    }

    const optionsActions = [
      { label: "Attaque physique", valeur: "ATTAQUE_PHYSIQUE" },
      { label: "Berserk (130%, cible aléatoire, -20% PV)", valeur: "BERSERK" },
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
    } else if (actionChoisie === "BERSERK") {
      this.berserk(ennemis);
    } else {
      console.log(`${this.nom} ne fait rien ce tour-ci.`);
    }
  }
}
