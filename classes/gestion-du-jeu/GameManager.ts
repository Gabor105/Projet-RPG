// GameManager.ts
import {Character } from "../Character.ts";
import { Fight } from "../Fight.ts";
import { Monstre } from "../Monstre.ts";
import { Menu } from "../utils/Menu.ts";
import { creerAventurier, TypeAventurier } from "../FabriqueAventurier.ts";
import { Aventurier } from "../Aventurier.ts";
import { Ecrire } from "../../Ecrire.ts";
import {SalleCoffre} from "./SalleCoffre.ts";
import données from '../données.json' with { type: 'json' };
import {Invantaire} from "../Invantaire.ts";
import {Potion} from "../Objets/Potion.ts";
import {Ether} from "../Objets/Ether.ts";
import {MorceauEtoile} from "../Objets/MorceauEtoile.ts";

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

  public async lancerJeu() {
    // introduction :
    console.log("=== RPG POO - B1 ===");
    console.log("Bienvenue dans le RPG en ligne de commande !");
    console.log("Vous allez choisir un groupe de 3 aventuriers.\n");

    this.equipeA = this.choisirGroupeAventuriers();
    const fight0 : Fight = new Fight(true);
    await fight0.lancer();
    // constitution de l'équipe :
    console.log("\nVotre groupe d'aventuriers :");
    for (const perso of this.equipeA) {
      console.log(` - ${perso.nom}`);
    }
    this.equipeB = this.creerMonstresPourPremierCombat();

    // déroulement de la partie :
    //1.	Une salle avec un combat aléatoire ( 3 monstres) 🦹‍♀️🧟🧜‍♂️
    const fight1 : Fight = new Fight(false);
    await fight1.lancer();
    //2.	Une salle avec un coffre 🧰, pouvant être un piège qui blesse le personnage l'ouvrant, ou deux objets aléatoires
    const coffre1 : SalleCoffre = new SalleCoffre();
    await coffre1.ouvrirCoffre();
    //3.	Une seconde salle avec un combat aléatoire (3 monstres) 🦹‍♀️🧟🧜‍♂️
    const fight2 : Fight = new Fight(false);
    await fight2.lancer();
    //4.	Une seconde salle avec un coffre (idem) 🧰
    const coffre2 : SalleCoffre = new SalleCoffre();
    await coffre2.ouvrirCoffre();
    //5.	Une salle avec un Boss (monstre unique) 🧛
    const fight3 : Fight = new Fight(true);
    await fight3.lancer();
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

  public creerMonstresPourPremierCombat(): Monstre[] {
    const listePosibilitéEnnemie = [données.Orc, données.Gobelin, données.Troll, données.Liche, données.Golem_de_Pierre, données.Spectre];
    const d1 = listePosibilitéEnnemie[Math.floor(Math.random() * listePosibilitéEnnemie.length)];
    const d2 = listePosibilitéEnnemie[Math.floor(Math.random() * listePosibilitéEnnemie.length)];
    const d3 = listePosibilitéEnnemie[Math.floor(Math.random() * listePosibilitéEnnemie.length)];

    const monstre1 = new Monstre(d1.nom, d1.pvMax, d1.attaque, d1.defense, d1.vitesse);
    const monstre2 = new Monstre(d2.nom, d2.pvMax, d2.attaque, d2.defense, d2.vitesse);
    const monstre3 = new Monstre(d3.nom, d3.pvMax, d3.attaque, d3.defense, d3.vitesse);

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
