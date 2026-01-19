// FabriqueAventurier.ts
import { Character } from "../Character.ts";
import { Guerrier } from "./Guerrier.ts";
import { Mage } from "./Mage.ts";

export type TypeAventurier = "Guerrier" | "Mage";
// plus tard: | "Paladin" | "Barbare" | "Prêtre" | "Voleur"

export function creerAventurier(type: TypeAventurier, numero: number): Character {
  const nom = `${type} ${numero}`;

  switch (type) {
    case "Guerrier":
      return new Guerrier(nom);
    case "Mage":
      return new Mage(nom);
  }
}
