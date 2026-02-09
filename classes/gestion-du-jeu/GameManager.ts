// GameManager.ts
import { Fight } from "../Fight.ts";
import { Monstre } from "../Monstre.ts";
import { Menu } from "../utils/Menu.ts";
import { creerAventurier, TypeAventurier } from "../FabriqueAventurier.ts";
import { Aventurier } from "../Aventurier.ts";
import { Ecrire } from "../../Ecrire.ts";
import {SalleCoffre} from "./SalleCoffre.ts";
import données from '../données.json' with { type: 'json' };

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
    // constitution de l'équipe :
    console.log("\nVotre groupe d'aventuriers :");
    for (const perso of this.equipeA) {
      console.log(` - ${perso.nom}`);
    }

    let valeurCombat = true;

    const ecrire = new Ecrire();
    ecrire.ecrireUnePhrase("Aujourd’hui, comme à leur habitude, le trio d’aventuriers tient son stand d’aide dans la forêt. Leur objectif est de venir bénévolement aider quiconque aurait besoin d’aide dans la forêt.");
    ecrire.ecrireUnePhrase("Soudain, un gentil petit monstre s’approche d’eux et leur dit :");
    ecrire.ecrireUnePhrase("— J’ai besoin de votre aide ! Le méchant dragon a capturé mon ami parce qu’il cultivait des carottes ! Il faut que vous le libériez ! dit le gentil monstre.");
    ecrire.ecrireUnePhrase("Ce dragon est le chef du service de protection de la forêt, ce qui lui octroie le droit de créer des règles comme il le désire. Heureusement pour notre groupe d’aventuriers, il y a une solution assez simple pour libérer les prisonniers victimes des lois que le dragon instaure. Il faut parcourir les cinq salles du donjon réalisé par le dragon et vaincre le dragon ; en échange de quoi, le dragon libérera le prisonnier et créera une nouvelle loi proposée par le vainqueur du donjon, si celle-ci est possible.");
    ecrire.ecrireUnePhrase("Les aventuriers acceptèrent alors la requête de ce petit monstre et rentrèrent dans le donjon.");


    // déroulement de la partie :
    //1.	Une salle avec un combat aléatoire ( 3 monstres) 🦹‍♀️🧟🧜‍♂️
    const fight1 : Fight = new Fight(false);
    valeurCombat = await fight1.lancer();
    if (!valeurCombat) return;
    //2.	Une salle avec un coffre 🧰, pouvant être un piège qui blesse le personnage l'ouvrant, ou deux objets aléatoires
    const coffre1 : SalleCoffre = new SalleCoffre();
    await coffre1.ouvrirCoffre();
    //3.	Une seconde salle avec un combat aléatoire (3 monstres) 🦹‍♀️🧟🧜‍♂️
    const fight2 : Fight = new Fight(false);
    valeurCombat = await fight2.lancer();
    if (!valeurCombat) return;
    //4.	Une seconde salle avec un coffre (idem) 🧰
    const coffre2 : SalleCoffre = new SalleCoffre();
    await coffre2.ouvrirCoffre();
    //5.	Une salle avec un Boss (monstre unique) 🧛
    const fight3 : Fight = new Fight(true);
    valeurCombat = await fight3.lancer();
    if (!valeurCombat) return;

    ecrire.ecrireUnePhrase("— Bravo !! dit le dragon. Puisque vous avez gagné, je vais libérer votre ami. Quelle loi voulez-vous ajouter à notre belle forêt ?");
    ecrire.ecrireUnePhrase("— Nous voulons que vous réautorisiez la culture de carottes ! dirent alors en chœur les aventuriers.");
    ecrire.ecrireUnePhrase("— Ahhh… Je ne sais pas si c’est une bonne idée. En fait, si j’ai interdit cette culture, c'est parce qu’un de mes amis a récemment mangé une carotte que l’on lui avait donnée et qu’il a été malade durant plusieurs jours après cela… Je ne veux pas que cela puisse arriver à quelqu’un d’autre, explique le dragon.");
    ecrire.ecrireUnePhrase("— Vous êtes sûr que c’était vraiment une carotte ? demande le cultivateur de carottes.");
    ecrire.ecrireUnePhrase("— Je n’avais jamais vu de carotte avant ce jour-là, donc je ne sais pas. Mais c’est vrai que vos carottes ne ressemblent pas à celle qu’il avait mangée… De plus, il l’avait récupérée dans l’eau… Ah… C’était sûrement un poisson et non une carotte ! dit le dragon.");
    ecrire.ecrireUnePhrase("— Si vous le souhaitez, je suis un expert dans la réalisation de gâteaux à la carotte ! Vous voulez en goûter ? demande l’ex-prisonnier.");
    ecrire.ecrireUnePhrase("— Oui, je veux bien, merci, dit le dragon.");
    ecrire.ecrireUnePhrase("Tout le monde se mit alors à goûter le gâteau à la carotte. Il était si bon que le dragon s’exclama et dit :");
    ecrire.ecrireUnePhrase("— Quel délicieux gâteau ! Comment ai-je pu rater cela toute ma vie ? J’annonce qu’à partir d’aujourd’hui, non seulement la culture de carottes sera autorisée, mais en plus, cette journée sera la fête de la carotte pour ne plus jamais oublier que la carotte, c’est super bon !");
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

    const monstre1 = new Monstre(d1.nom, d1.pvMax, d1.attaque, d1.defense, d1.vitesse, d1.pmMax);
    const monstre2 = new Monstre(d2.nom, d2.pvMax, d2.attaque, d2.defense, d2.vitesse, d2.pmMax);
    const monstre3 = new Monstre(d3.nom, d3.pvMax, d3.attaque, d3.defense, d3.vitesse, d3.pmMax);

    return [monstre1, monstre2, monstre3];
  }

  public afficherLesStatistiques(){
    const e = new Ecrire();
    e.ecrireUnePhrase(` === AMIS ===\n`);
    for (let i = 0; i < this.equipeA.length; i++) {
      e.ecrireUnePhrase(` │ NOM     : ${this.equipeA[i].nom}\n`);
      e.ecrireUnePhrase(` │ PV max  : ${this.equipeA[i].pvMax}\n`);
      e.ecrireUnePhrase(` │ PV      : ${this.equipeA[i].pvActuels}\n`);
      e.ecrireUnePhrase(` │ Attaque : ${this.equipeA[i].attaque}\n`);
      e.ecrireUnePhrase(` │ Défense : ${this.equipeA[i].defense}\n`);
      e.ecrireUnePhrase(` │ Vitesse : ${this.equipeA[i].vitesse}\n`);
      if (this.equipeA[i].pmMax > 0) e.ecrireUnePhrase(` │ PM max  : ${this.equipeA[i].pmMax}\n`);
      if (this.equipeA[i].pmMax > 0) e.ecrireUnePhrase(` │ PM      : ${this.equipeA[i].pmActuels}\n\n`);
    }
    e.ecrireUnePhrase(` === ENNEMIES ===\n`);
    for (let i = 0; i < this.equipeB.length; i++) {
      e.ecrireUnePhrase(` │ NOM     : ${this.equipeB[i].nom}\n`);
      e.ecrireUnePhrase(` │ PV max  : ${this.equipeB[i].pvMax}\n`);
      e.ecrireUnePhrase(` │ PV      : ${this.equipeB[i].pvActuels}\n`);
      e.ecrireUnePhrase(` │ Attaque : ${this.equipeB[i].attaque}\n`);
      e.ecrireUnePhrase(` │ Défense : ${this.equipeB[i].defense}\n`);
      e.ecrireUnePhrase(` │ Vitesse : ${this.equipeB[i].vitesse}\n`);
      if (this.equipeA[i].pmMax > 0) e.ecrireUnePhrase(` │ PM max  : ${this.equipeB[i].pmMax}\n`);
      if (this.equipeA[i].pmMax > 0) e.ecrireUnePhrase(` │ PM      : ${this.equipeB[i].pmActuels}\n\n`);
    }
  }
}
