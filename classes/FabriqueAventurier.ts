// FabriqueAventurier.ts
import { Character } from "./Character.ts";
import { Guerrier } from "./classes/Guerrier.ts";
import { Mage } from "./classes/Mage.ts";
import { Paladin } from "./classes/Paladin.ts";
import { Barbare } from "./classes/Barbare.ts"
import { Pretre } from "./classes/Pretre.ts"
import { Voleur } from "./classes/Voleur.ts";
import { Aventurier } from "./Aventurier.ts";


export type TypeAventurier = "Guerrier" | "Mage" | "Paladin" | "Barbare" | "Prêtre" | "Voleur";

export function creerAventurier(type: TypeAventurier, numero: number): Aventurier {
  const nom = `${type} ${numero}`;

  switch (type) {
    case "Guerrier":
      return new Guerrier(nom);
    case "Mage":
      return new Mage(nom);
    case "Paladin":
      return new Paladin(nom);
    case "Barbare":
      return new Barbare(nom);
    case "Prêtre":
      return new Pretre(nom);
    case "Voleur":
      return new Voleur(nom);
  }
}
