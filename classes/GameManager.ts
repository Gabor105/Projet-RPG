// GameManager.ts
import {Character } from "./Character.ts";
import { Fight } from "./Fight.ts";
import { Monstre } from "./Monstre.ts";
import { Menu } from "./Menu.ts";
import { creerAventurier, TypeAventurier } from "./FabriqueAventurier.ts";

export class GameManager {
  typesDisponibles: TypeAventurier[] = ["Guerrier", "Mage", "Paladin", "Barbare", "Prêtre", "Voleur"];

  lancerJeu(): void {
    console.log("=== RPG POO - B1 ===");
    console.log("Bienvenue dans le RPG en ligne de commande !");
    console.log("Vous allez choisir un groupe de 3 aventuriers.\n");

    const equipeA : Character[] = this.choisirGroupeAventuriers();

    console.log("\nVotre groupe d'aventuriers :");
    for (const perso of equipeA) {
      console.log(` - ${perso.nom}`);
    }

    const equipeB : Character[] = this.creerMonstresPourPremierCombat();

    const fight : Fight = new Fight(equipeA, equipeB);
    fight.lancer();

    console.log("\nFin de la partie (version simple - un seul combat).");
  }

  private choisirGroupeAventuriers(): Character[] {
    const equipe: Character[] = [];

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

  private creerMonstresPourPremierCombat(): Character[] {
    const monstre1 = new Monstre("Orc", 100, 16, 5, 7);
    const monstre2 = new Monstre("Gobelin", 70, 12, 2, 13);
    const monstre3 = new Monstre("Troll", 140, 20, 8, 5);

    return [monstre1, monstre2, monstre3];
  }
}
