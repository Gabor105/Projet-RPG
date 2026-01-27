// Monstre.ts
import { Character } from "./Character.ts";
import { Aventurier } from "./Aventurier.ts";

export class Monstre extends Character {
  constructor(
    nom: string,
    pvMax: number,
    attaque: number,
    defense: number,
    vitesse: number,
  ) {
    super(nom, pvMax, attaque, defense, vitesse, false);
  }

  jouerTour(cibles: Aventurier[]): void {    
    const ciblesVivantes = cibles.filter((c) => c.estVivant());

    if (ciblesVivantes.length === 0 || !this.estVivant()) {
      return;
    }
    console.log(`\n--- Tour de ${this.nom} ---`);

    let cible: Aventurier;
    const random = Math.random();

    if (random <= 0.2) {
      // 20% : attaque le personnage avec le moins de PV vivant
      cible = ciblesVivantes.reduce((a, b) => 
        a.lireVieActuel() < b.lireVieActuel() ? a : b
      );
    } else {
      // 80% : attaque un aventurier vivant au hasard
      const index = Math.floor(Math.random() * ciblesVivantes.length);
      cible = ciblesVivantes[index];
    }
    this.attaqueBasique(cible);
  }
}
