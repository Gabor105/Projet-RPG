// Personnage.ts

export class Character {
  nom: string;
  pvMax: number;
  pvActuels: number;
  attaque: number;
  defense: number;
  vitesse: number;

  constructor(
    nom: string,
    pvMax: number,
    attaque: number,
    defense: number,
    vitesse: number,
  ) {
    this.nom = nom;
    this.pvMax = pvMax;
    this.pvActuels = pvMax;
    this.attaque = attaque;
    this.defense = defense;
    this.vitesse = vitesse;
  }

  estVivant(): boolean {
    return this.pvActuels > 0;
  }

  subirDegats(valeurDegats: number): void {
    const degatsEffectifs = Math.max(0, valeurDegats - this.defense);
    this.pvActuels = Math.max(0, this.pvActuels - degatsEffectifs);
    console.log(
      `${this.nom} subit ${degatsEffectifs} dégâts. PV restants : ${this.pvActuels}/${this.pvMax}`,
    );
  }

  soignerPourcentage(pourcentage: number): void {
    if (!this.estVivant()) {
      console.log(`${this.nom} est K.O. et ne peut pas être soigné normalement.`);
      return;
    }

    const soin = Math.floor((this.pvMax * pourcentage) / 100);
    this.pvActuels = Math.min(this.pvMax, this.pvActuels + soin);
    console.log(
      `${this.nom} récupère ${soin} PV. PV : ${this.pvActuels}/${this.pvMax}`,
    );
  }

  ressusciter(pourcentage: number): void {
    if (this.estVivant()) {
      const soin = Math.floor((this.pvMax * pourcentage) / 100);
      this.pvActuels = Math.min(this.pvMax, this.pvActuels + soin);
      console.log(
        `${this.nom} est déjà vivant, il est soigné de ${soin} PV. PV : ${this.pvActuels}/${this.pvMax}`,
      );
      return;
    }

    const pvRestaure = Math.floor((this.pvMax * pourcentage) / 100);
    this.pvActuels = Math.max(1, pvRestaure);
    console.log(
      `${this.nom} est ressuscité avec ${this.pvActuels}/${this.pvMax} PV !`,
    );
  }

  attaqueBasique(cible: Character): void {
    if (!this.estVivant()) {
      console.log(`${this.nom} est K.O. et ne peut pas attaquer.`);
      return;
    }

    console.log(`${this.nom} attaque ${cible.nom} !`);
    cible.subirDegats(this.attaque);
  }
}
