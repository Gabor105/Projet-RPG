// Aventurier.ts
import { Character } from "./Character.ts";

export abstract class Aventurier extends Character {
  constructor(
    nom: string,
    pvMax: number,
    attaque: number,
    defense: number,
    vitesse: number,
  ) {
    super(nom, pvMax, attaque, defense, vitesse);
  }

  abstract jouerTour(
    ennemis: Character[],
    allies: Character[],
  ): void;
}
