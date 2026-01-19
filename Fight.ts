// Combat.ts
import { Character } from "./Character.ts";
import { Aventurier } from "./Aventurier.ts";
import { Monstre } from "./Monstre.ts";

export class Fight {
  equipeA: Character[];
  equipeB: Character[];
  ordreTours: Character[];
  numeroTour: number = 1;

  constructor(equipeA: Character[], equipeB: Character[]) {
    this.equipeA = equipeA;
    this.equipeB = equipeB;
    this.ordreTours = [...equipeA, ...equipeB];

    this.ordreTours.sort((a, b) => b.vitesse - a.vitesse);
  }

  private afficherEtatEquipes(): void {
    console.log("\n--- État des équipes ---");
    console.log("Équipe A :");
    for (const perso of this.equipeA) {
      console.log(
        ` - ${perso.nom} : ${perso.pvActuels}/${perso.pvMax} PV`,
      );
    }
    console.log("Équipe B :");
    for (const perso of this.equipeB) {
      console.log(
        ` - ${perso.nom} : ${perso.pvActuels}/${perso.pvMax} PV`,
      );
    }
    console.log("------------------------\n");
  }

  private equipeEstMorte(equipe: Character[]): boolean {
    return equipe.every((perso) => !perso.estVivant());
  }

  lancer(): void {
    console.log(">>> Début du combat !");
    this.afficherEtatEquipes();

    while (true) {
      console.log(`===== TOUR ${this.numeroTour} =====`);

      for (const perso of this.ordreTours) {
        if (!perso.estVivant()) {
          continue;
        }

        const estDansEquipeA = this.equipeA.includes(perso);
        const allies = estDansEquipeA ? this.equipeA : this.equipeB;
        const ennemis = estDansEquipeA ? this.equipeB : this.equipeA;

        if (perso instanceof Aventurier) {
          (perso as Aventurier).jouerTour(ennemis, allies);
        } else if (perso instanceof Monstre) {
          (perso as Monstre).jouerTour(allies);
        } else {
          const ciblesVivantes = ennemis.filter((e) => e.estVivant());
          if (ciblesVivantes.length > 0) {
            const index = Math.floor(Math.random() * ciblesVivantes.length);
            const cible = ciblesVivantes[index];
            console.log(`(Simple) ${perso.nom} attaque ${cible.nom} !`);
            perso.attaqueBasique(cible);
          }
        }

        if (this.equipeEstMorte(this.equipeA)) {
          console.log("\nTous les membres de l'équipe A sont K.O. !");
          console.log("Victoire de l'équipe B !");
          this.afficherEtatEquipes();
          return;
        }
        if (this.equipeEstMorte(this.equipeB)) {
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
