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
    pmMax: number = 0,
  ) {
    super(nom, pvMax, attaque, defense, vitesse, false, pmMax);
  }

  jouerTour(cibles: Aventurier[]): void {    
    const ciblesVivantes = cibles.filter((c) => c.estVivant());

    if (ciblesVivantes.length === 0 || !this.estVivant()) {
      return;
    }
    console.log(`--- Tour de ${this.nom} ---`);

    let cible: Aventurier;
    const random = Math.random();

    if (random <= 0.2) {
      // 20% : attaque le personnage avec le moins de PV vivant
      cible = ciblesVivantes.reduce((a, b) => 
        a.lireVieActuelle() < b.lireVieActuelle() ? a : b
      );
    } else {
      // 80% : attaque un aventurier vivant au hasard
      const index = Math.floor(Math.random() * ciblesVivantes.length);
      cible = ciblesVivantes[index];
    }
    if (this.pmActuels > 0 && Math.floor(Math.random() * 101)> 40){
      this.attaqueMagique(cible);
    } else {
      this.attaqueBasique(cible);
    }
  }
}
