import { Fight } from "../classes/Fight.ts";
import { Character } from "../classes/Character.ts";
import { Monstre } from "../classes/Monstre.ts";

export class SalleCombat {

  entrer(hero: Character): void {
    console.log("Vous entrez dans une salle de combat du donjon...");

    const ennemi = this.creerEnnemiAleatoire();

    console.log(`Un ${ennemi.nom} apparaît !`);

    const combat = new Fight([hero], [ennemi]);
    combat.lancer();
  }

  private creerEnnemiAleatoire(): Monstre {
    const ennemisPossibles: Monstre[] = [
      new Monstre("Orc", 100, 16, 5, 7),
      new Monstre("Gobelin", 70, 12, 2, 13),
      new Monstre("Troll", 140, 20, 8, 5),
    ];

    const index = Math.floor(Math.random() * ennemisPossibles.length);
    return ennemisPossibles[index];
  }
}
// perso test
if (import.meta.main) {
  const testChar = new Character("Test", 100, 10, 5, 5, 20, 20);
  new SalleCombat().entrer(testChar);
}
