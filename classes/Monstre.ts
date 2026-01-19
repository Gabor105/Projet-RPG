// Monstre.ts
import { Character } from "../Character.ts";

export class Monstre extends Character {
  constructor(
    nom: string,
    pvMax: number,
    attaque: number,
    defense: number,
    vitesse: number,
  ) {
    super(nom, pvMax, attaque, defense, vitesse);
  }

  jouerTour(cibles: Character[]): void {
    const ciblesVivantes = cibles.filter((c) => c.estVivant());
    if (ciblesVivantes.length === 0 || !this.estVivant()) {
      return;
    }

    const index = Math.floor(Math.random() * ciblesVivantes.length);
    const cible = ciblesVivantes[index];

    console.log(`(IA) ${this.nom} attaque ${cible.nom} !`);
    this.attaqueBasique(cible);
  }
}
