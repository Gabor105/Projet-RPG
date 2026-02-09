import { Character } from "./Character.ts";
import { Aventurier } from "./Aventurier.ts";
import { Monstre } from "./Monstre.ts";
import { Ecrire } from "../Ecrire.ts";
import { GameManager } from "./gestion-du-jeu/GameManager.ts";
import { Boss } from "./Boss.ts";

export class Fight {
  private ecrire : Ecrire = new Ecrire();
  ordreTours: Character[];
  numeroTour: number = 1;
  tempsAttante:number = 2;//temps de lecture entre les textes. (en seconde)

  constructor(combatDeBoss:boolean) {
    if (!combatDeBoss) GameManager.instance.equipeB = GameManager.instance.creerMonstresPourPremierCombat();
    else GameManager.instance.equipeB = [new Boss()]

    this.ordreTours = [...GameManager.instance.equipeA, ...GameManager.instance.equipeB];

    this.ordreTours.sort((a, b) => b.vitesse - a.vitesse);
  }

  private afficherEtatEquipes(): void {
    this.ecrire.ecrireUnePhrase("\n--- État des équipes ---\n");
    console.log("Équipe A :");
    for (const perso of GameManager.instance.equipeA) {
      this.ecrire.ecrireUnePhrase(` - *Green*${perso.nom}*Reset* : *Red*${perso.pvActuels}/${perso.pvMax} PV*Reset*\n`);
    }
    console.log("Équipe B :");
    for (const perso of GameManager.instance.equipeB) {
      this.ecrire.ecrireUnePhrase(` - *Green*${perso.nom}*Reset* : *Red*${perso.pvActuels}/${perso.pvMax} PV*Reset*\n`);
    }
    console.log("------------------------\n");
  }

  private equipeEstMorte(equipe: Character[]): boolean {
    return equipe.every((perso) => !perso.estVivant());
  }

  async lancer():Promise<boolean> {
    this.ecrire.ecrireUnePhrase(">>> Début du combat !");
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
          await perso.jouerTour(GameManager.instance.equipeB, GameManager.instance.equipeA);
          await sleep(this.tempsAttante*1000);
        } else if (perso instanceof Monstre) {
          console.log("");
          await perso.jouerTour(GameManager.instance.equipeA);
          await sleep(this.tempsAttante*1000);
        } else {
          const ciblesVivantes = GameManager.instance.equipeB.filter((e) => e.estVivant());
          if (ciblesVivantes.length > 0) {
            const index = Math.floor(Math.random() * ciblesVivantes.length);
            const cible = ciblesVivantes[index];
            console.log(`(Simple) ${perso.nom} attaque ${cible.nom} !`);
            perso.attaqueBasique(cible);
          }
        }

        if (this.equipeEstMorte(GameManager.instance.equipeB)) {
          console.log("\nTous les monstres sont K.O. !");
          console.log("Victoire !");
          this.afficherEtatEquipes();
          return true;
        }
        if (this.equipeEstMorte(GameManager.instance.equipeA)) {
          console.log("\nTous les aventuriers sont K.O. !");
          console.log("Vous avez perdu... Rejouer pour tenter votre chance de nouveau !");
          this.afficherEtatEquipes();
          return false;
        }
      }

      this.afficherEtatEquipes();
      this.numeroTour++;
    }
    return false;
  }
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));