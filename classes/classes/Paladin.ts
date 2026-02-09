// Paladin.ts
import { Aventurier } from "../Aventurier.ts";
import { Character } from "../Character.ts";
import { Ecrire } from "../../Ecrire.ts";
import { GameManager } from "../gestion-du-jeu/GameManager.ts";
import { Choix } from "../utils/Choix.ts";
import données from '../données.json' with { type: 'json' };

export class Paladin extends Aventurier {
  constructor(nom: string) {
    const a = données.Paladin;
    super(nom, a.pvMax, a.attaque, a.defense, a.vitesse, a.pmMax);
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

  public override async jouerTour(ennemis: Character[], allies: Character[]): Promise<void> {
    if (!this.phraseTours()) return;
    const choix = new Choix();
    console.log("Que veut-tu faire ?");
    const valeur = await choix.faireUnChoix(["1 - Attaque sainte (tous les ennemis)","2 - Attaquer physique","3 - Invantaire","4 - Voir les statistiques des personnages","5 - Ne rien faire"]);
    
    switch (valeur) {
      case 1 :
        this.attaqueSainte(ennemis);
        break;
      case 2 :
        this.attaquePhysique(ennemis)
        break;
      case 3 :
        await this.regarderInvantaire();
        break;
      case 4 :
        GameManager.instance.afficherLesStatistiques();
        this.jouerTour(ennemis, allies);
        break;
      case 5 :
        new Ecrire().ecrireUnePhrase("Bien, l'aison le temps s'écouler.");
        break;
    }
  }
}
