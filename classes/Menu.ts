// Menu.ts

export class Menu<T> {
  question: string;
  options: { label: string; valeur: T }[];

  constructor(question: string, options: { label: string; valeur: T }[]) {
    this.question = question;
    this.options = options;
  }

  poserQuestion(): T {
    while (true) {
      console.log("\n" + this.question);

      this.options.forEach((option, index) => {
        console.log(`${index + 1}. ${option.label}`);
      });

      const reponse = prompt("Votre choix : ");

      if (reponse === null) {
        console.log("Veuillez entrer un nombre correspondant à une option.");
        continue;
      }

      const choixNum = Number(reponse);

      if (
        Number.isNaN(choixNum) ||
        choixNum < 1 ||
        choixNum > this.options.length
      ) {
        console.log("Choix invalide, veuillez recommencer.");
        continue;
      }

      const optionChoisie = this.options[choixNum - 1];
      return optionChoisie.valeur;
    }
  }
}
