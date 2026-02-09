import { Character } from "../classes/Character.ts";
import { Monstre } from "../classes/Monstre.ts";
import { Fight } from "../classes/Fight.ts";

export class combatboss {
  monstres: Monstre[] = [];
   Coffre: boolean[] = [];
  
  constructor(private nbcoffre: number = 0, private character: Character) {
    console.log("Vous entrez dans la salle du boss du donjon...");

    let continuer = true;

    while (continuer) {
      const choix = prompt(
        "Que voulez-vous faire ?\n" +
        "(1) Affronter le boss\n" +
        "(2) L'observer\n"
      )?.toLowerCase();

      switch (choix) {
        case '1':
        case 'affronter':
          this.combatboss();
           continuer = false;  
          break;
    

        case '2':
        case 'observer':
          console.log(
            "Le boss est un géant de plusieurs mètres de haut avec une armure en fer et des griffes acérées."
          );
          break;

        default:
          console.error("Choix invalide, Vous ne faites rien.");
      }
    }
  }

private combatboss() {
    const bigboss = new Monstre("le Boss", 120, 25, 10, 12);
    console.log(`Le ${bigboss.nom} se dresse devant vous prêt à en découdre !`);

    const combat = new Fight([this.character], [bigboss]);
    combat.lancer();

    if (!bigboss.estVivant()) {
      console.log("Vous avez été vaincu par Big Boss...");
    } else {
      console.log("Vous avez térassé le dernier enemi et avez terminé le donjon !");
    }

  }
}
// perso test
if (import.meta.main) {
  const testChar = new Character("Test", 100, 10, 5, 5, 20, 20);
  new combatboss(1, testChar);
}


