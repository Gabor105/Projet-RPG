// Aventurier.ts
import { Character } from "./Character.ts";

export abstract class Aventurier extends Character {
  constructor(
    nom: string,
    pvMax: number,
    attaque: number,
    defense: number,
    vitesse: number,
    pmMax: number = 0,
    pmActuels: number = 0,
  ) {
    // On envoie tous les paramètres au constructeur de Character
    super(nom, pvMax, attaque, defense, vitesse, true, pmMax, pmActuels);
  }

  abstract jouerTour(
    ennemis: Character[],
    allies: Character[],
  ): void;
}
