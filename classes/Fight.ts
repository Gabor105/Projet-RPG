import { Character } from "./Character.ts";
import { Aventurier } from "./Aventurier.ts";
import { Monstre } from "./Monstre.ts";
import { Ecrire } from "../Ecrire.ts";
import { GameManager } from "./GameManager.ts";

export class Fight {
  ecrire : Ecrire = new Ecrire();
  ordreTours: Character[];
  numeroTour: number = 1;

  constructor() {
    this.ordreTours = [...GameManager._instance.equipeA, ...GameManager._instance.equipeB];

    this.ordreTours.sort((a, b) => b.vitesse - a.vitesse);
  }

  private afficherEtatEquipes(): void {
    this.ecrire.EcrireUnePhrase("\n--- État des équipes ---\n");
    console.log("Équipe A :");
    for (const perso of GameManager._instance.equipeA) {
      this.ecrire.EcrireUnePhrase(` - *Green*${perso.nom}*Reset* : *Red*${perso.pvActuels}/${perso.pvMax} PV*Reset*\n`);
    }
    console.log("Équipe B :");
    for (const perso of GameManager._instance.equipeB) {
      this.ecrire.EcrireUnePhrase(` - *Green*${perso.nom}*Reset* : *Red*${perso.pvActuels}/${perso.pvMax} PV*Reset*\n`);
    }
    console.log("------------------------\n");
  }

  private equipeEstMorte(equipe: Character[]): boolean {
    return equipe.every((perso) => !perso.estVivant());
  }

  lancer(): void {
    this.ecrire.EcrireUnePhrase(">>> Début du combat !");
    this.afficherEtatEquipes();

    while (true) {
      console.log(`===== TOUR ${this.numeroTour} =====`);

      for (const perso of this.ordreTours) {
        if (!perso.estVivant()) {
          continue;
        }

        // const estDansEquipeA = this.equipeA.includes(perso);
        // const allies = estDansEquipeA ? this.equipeA : this.equipeB;
        // const ennemis = estDansEquipeA ? this.equipeB : this.equipeA;

        if (perso instanceof Aventurier) {
          (perso as Aventurier).jouerTour(GameManager._instance.equipeB, GameManager._instance.equipeA);
        } else if (perso instanceof Monstre) {
          (perso as Monstre).jouerTour(GameManager._instance.equipeA);
        } else {
          const ciblesVivantes = GameManager._instance.equipeB.filter((e) => e.estVivant());
          if (ciblesVivantes.length > 0) {
            const index = Math.floor(Math.random() * ciblesVivantes.length);
            const cible = ciblesVivantes[index];
            console.log(`(Simple) ${perso.nom} attaque ${cible.nom} !`);
            perso.attaqueBasique(cible);
          }
        }

        if (this.equipeEstMorte(GameManager._instance.equipeA)) {
          console.log("\nTous les membres de l'équipe A sont K.O. !");
          console.log("Victoire de l'équipe B !");
          this.afficherEtatEquipes();
          return;
        }
        if (this.equipeEstMorte(GameManager._instance.equipeB)) {
          console.log("\nTous les membres de l'équipe B sont K.O. !");
          console.log("Victoire de l'équipe A !");
          this.afficherEtatEquipes();
          return;
        }
      }

      this.afficherEtatEquipes();
      this.numeroTour++;
    }
  }
}
