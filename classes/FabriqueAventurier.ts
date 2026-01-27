// FabriqueAventurier.ts
import { Character } from "./Character.ts";
import { Guerrier } from "./Guerrier.ts";
import { Mage } from "./Mage.ts";
import { Paladin } from "./Paladin.ts";
import { Barbare } from "./Barbare.ts"
import { Pretre } from "./Pretre.ts"
import { Voleur } from "./Voleur.ts";
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
