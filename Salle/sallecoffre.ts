import { Character } from "../classes/Character.ts";
import { Potion } from "../classes/Objets/Potion.ts";
import { Ether } from "../classes/Objets/Ether.ts";   

export class SalleCoffre {

  constructor(private character: Character) {
    console.log(
      "Vous entrez dans la deuxième salle du donjon, un coffre se trouve au centre de la pièce..."
    );

    let continuer = true;

    while (continuer) {
      const choix = prompt(
        "Que voulez-vous faire ?\n" +
        "(1) Ouvrir le coffre\n" +
        "(2) Observer la salle\n"
      )?.toLowerCase();

      switch (choix) {
        case '1':
        case 'ouvrir':
          this.coffre();
          console.log("La salle est terminée.\n");
          continuer = false;
          break;

        case '2':
        case 'observer':
          console.log(
            "Vous observez la salle. Il n'y a rien d'autre à voir ici à part le coffre en son centre. Votre équipe s'impatiente."
          );
          break;

        default:
          console.error("Choix invalide, Vous ne faites rien.");
      }
    }
  }

  private coffre(): void {
    const chance = Math.random();

    if (chance < 0.5) {
      const types = ["potion", "ether"];
      const typeAleatoire = types[Math.floor(Math.random() * types.length)];

      if (typeAleatoire === "potion") {
        console.log("Vous avez trouvé une potion de soin !");
        this.character.Inventaire.ajouterObjet(new Potion());
      } else {
        console.log("Vous avez trouvé un Ether pour restaurer vos PM !");
        this.character.Inventaire.ajouterObjet(new Ether());
      }
    } else {
      const degats = 4;
      this.character.pvActuels = Math.max(
        0,
        this.character.pvActuels - degats
      );

      console.log("Le coffre est piégé et explose !");
      console.log(
        `${this.character.nom} subit ${degats} dégâts. PV restants : ${this.character.pvActuels}/${this.character.pvMax}`
      );
    }
  }
}

// Test perso (a retirer plus tard)
if (import.meta.main) {
  const testChar = new Character("Test", 100, 10, 5, 5, 20, 20);
  new SalleCoffre(testChar);
}
