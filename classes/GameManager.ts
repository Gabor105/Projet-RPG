// GameManager.ts
import {Character } from "./Character.ts";
import { Fight } from "./Fight.ts";
import { Monstre } from "./Monstre.ts";
import { Menu } from "./Menu.ts";
import { creerAventurier, TypeAventurier } from "./FabriqueAventurier.ts";
import { Aventurier } from "./Aventurier.ts";
import { Ecrire } from "../Ecrire.ts";

export class GameManager {
  public static _instance : GameManager;
  typesDisponibles: TypeAventurier[] = ["Guerrier", "Mage", "Paladin", "Barbare", "Prêtre", "Voleur"];
  equipeA : Aventurier[] = [];
  equipeB : Monstre[] = [];

  public static get instance(){
    if (!GameManager._instance){
      GameManager._instance = new GameManager();
    }
    return GameManager._instance;
  }
  private constructor() {}

  public lancerJeu(): void {
    console.log("=== RPG POO - B1 ===");
    console.log("Bienvenue dans le RPG en ligne de commande !");
    console.log("Vous allez choisir un groupe de 3 aventuriers.\n");

    this.equipeA = this.choisirGroupeAventuriers();

    console.log("\nVotre groupe d'aventuriers :");
    for (const perso of this.equipeA) {
      console.log(` - ${perso.nom}`);
    }

    this.equipeB = this.creerMonstresPourPremierCombat();

    const fight : Fight = new Fight();
    fight.lancer();

    console.log("\nFin de la partie (version simple - un seul combat).");
  }

  private choisirGroupeAventuriers(): Aventurier[] {
    const equipe: Aventurier[] = [];

    for (let i = 1; i <= 3; i++) {
      const options = this.typesDisponibles.map((t) => ({
        label: t,
        valeur: t,
      }));

      const menuChoixClasse = new Menu<TypeAventurier>(
        `Choisissez la classe de l'aventurier ${i} :`,
        options,
      );

      const typeChoisi = menuChoixClasse.poserQuestion();
      const aventurier = creerAventurier(typeChoisi, i);
      equipe.push(aventurier);
    }

    return equipe;
  }

  private creerMonstresPourPremierCombat(): Monstre[] {
    const monstre1 = new Monstre("Orc", 100, 16, 5, 7);
    const monstre2 = new Monstre("Gobelin", 70, 12, 2, 13);
    const monstre3 = new Monstre("Troll", 140, 20, 8, 5);

    return [monstre1, monstre2, monstre3];
  }

  public afficherLesStatistiques(){
    const e = new Ecrire();
    e.EcrireUnePhrase(` === AMIS ===\n`);
    for (let i = 0; i < this.equipeA.length; i++) {
      e.EcrireUnePhrase(` │ NOM     : ${this.equipeA[i].nom}\n`);
      e.EcrireUnePhrase(` │ PV max  : ${this.equipeA[i].pvMax}\n`);
      e.EcrireUnePhrase(` │ PV      : ${this.equipeA[i].pvActuels}\n`);
      e.EcrireUnePhrase(` │ Attaque : ${this.equipeA[i].attaque}\n`);
      e.EcrireUnePhrase(` │ Défense : ${this.equipeA[i].defense}\n`);
      e.EcrireUnePhrase(` │ Vitesse : ${this.equipeA[i].vitesse}\n`);
      if (this.equipeA[i].pmMax > 0) e.EcrireUnePhrase(` │ PM max  : ${this.equipeA[i].pmMax}\n`);
      if (this.equipeA[i].pmMax > 0) e.EcrireUnePhrase(` │ PM      : ${this.equipeA[i].pmActuels}\n\n`);
    }
    e.EcrireUnePhrase(` === ENNEMIES ===\n`);
    for (let i = 0; i < this.equipeB.length; i++) {
      e.EcrireUnePhrase(` │ NOM     : ${this.equipeB[i].nom}\n`);
      e.EcrireUnePhrase(` │ PV max  : ${this.equipeB[i].pvMax}\n`);
      e.EcrireUnePhrase(` │ PV      : ${this.equipeB[i].pvActuels}\n`);
      e.EcrireUnePhrase(` │ Attaque : ${this.equipeB[i].attaque}\n`);
      e.EcrireUnePhrase(` │ Défense : ${this.equipeB[i].defense}\n`);
      e.EcrireUnePhrase(` │ Vitesse : ${this.equipeB[i].vitesse}\n`);
      if (this.equipeA[i].pmMax > 0) e.EcrireUnePhrase(` │ PM max  : ${this.equipeB[i].pmMax}\n`);
      if (this.equipeA[i].pmMax > 0) e.EcrireUnePhrase(` │ PM      : ${this.equipeB[i].pmActuels}\n\n`);
    }
  }
}
