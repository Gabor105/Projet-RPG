// Personnage.ts

export class Character {
  nom: string;
  pvMax: number;
  pvActuels: number;
  attaque: number;
  defense: number;
  vitesse: number;

  // Nouveau : gestion des Points de Magie (PM)
  pmMax: number;
  pmActuels: number;
  public cesUnJoueur : boolean;

  constructor(
    nom: string,
    pvMax: number,
    attaque: number,
    defense: number,
    vitesse: number,
    cesUnJoueur : boolean,
    pmMax: number = 0,
    pmActuels: number = 0,
  ) {
    this.nom = nom;
    this.pvMax = pvMax;
    this.pvActuels = pvMax;
    this.attaque = attaque;
    this.defense = defense;
    this.vitesse = vitesse;
    this.cesUnJoueur = cesUnJoueur;

    this.pmMax = pmMax;
    this.pmActuels = pmActuels;
  }

  // --------------------
  // Méthodes de base POO
  // --------------------

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
      console.log(`${this.nom} est K.O. et ne peut pas être soigné de cette façon.`);
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

  // -------------------------------
  // Méthodes pour la gestion des objets
  // (équivalentes aux méthodes de  Emerick)
  // -------------------------------

  // Soigner une QUANTITÉ brute de PV (utilisé par Potion, MorceauEtoile, DemiEtoile)
  soignerQuantite(quantite: number): void {
    // Tu peux décider si on bloque le soin sur un K.O. ou pas
    this.pvActuels = Math.min(
      this.pvMax,
      this.pvActuels + Math.floor(quantite),
    );
    console.log(
      `${this.nom} est soigné de ${Math.floor(quantite)} PV. PV : ${this.pvActuels}/${this.pvMax}`,
    );
  }

  // Équivalent de "êtreSoingner(quantitée:number)"
  êtreSoingner(quantite: number): void {
    this.soignerQuantite(quantite);
  }

  // Augmenter les PM (Ether)
  augmenterPM(quantite: number): void {
    this.pmActuels = Math.min(
      this.pmMax,
      this.pmActuels + Math.floor(quantite),
    );
    console.log(
      `${this.nom} récupère ${Math.floor(quantite)} PM. PM : ${this.pmActuels}/${this.pmMax}`,
    );
  }

  // Équivalent demandé par ton collègue : "augmanterPM"
  augmanterPM(quantite: number): void {
    this.augmenterPM(quantite);
  }

  // Getters compatibles avec son code

  lireVieMaximum(): number {
    return this.pvMax;
  }

  lireVieActuelle(): number {
    return this.pvActuels;
  }

  // Pour rester compatible avec son nom "lireVieActuel"
  lireVieActuel(): number {
    return this.pvActuels;
  }

  lirePMMaximum(): number {
    return this.pmMax;
  }

  lirePMActuel(): number {
    return this.pmActuels;
  }
}
