// Personnage.ts
import { Ecrire } from "../Ecrire.ts";
import { GameManager } from "./gestion-du-jeu/GameManager.ts"

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
  coutSort: number = 10;

  constructor(
    nom: string,
    pvMax: number,
    attaque: number,
    defense: number,
    vitesse: number,
    cesUnJoueur : boolean,
    pmMax: number = 0,
  ) {
    this.nom = nom;
    this.pvMax = pvMax;
    this.pvActuels = pvMax;
    this.attaque = attaque;
    this.defense = defense;
    this.vitesse = vitesse;
    this.cesUnJoueur = cesUnJoueur;

    this.pmMax = pmMax;
    this.pmActuels = pmMax;
  }

  estVivant(): boolean {
    return this.pvActuels > 0;
  }

  subirDegats(valeurDegats: number, magique:boolean=false): void {
    let degatsEffectifs = Math.max(1, valeurDegats - this.defense);
    if (magique){
      degatsEffectifs = Math.max(1, valeurDegats);
    }
    this.pvActuels = Math.max(0, this.pvActuels - degatsEffectifs);
    new Ecrire().ecrireUnePhrase(`\n*Blue*${this.nom}*Reset* subit *Red*${degatsEffectifs}*Reset* dégâts.\nPV restants : *Red*${this.pvActuels}/${this.pvMax}*Reset*`);
  }

  soignerPourcentage(pourcentage: number): void {
    if (!this.estVivant()) {
      new Ecrire().ecrireUnePhrase(`*Blue*${this.nom}*Reset* est *Red*K.O*Reset*. et ne peut pas être soigné de cette façon.`);
      return;
    }

    const soin = Math.floor((this.pvMax * pourcentage) / 100);
    this.pvActuels = Math.min(this.pvMax, this.pvActuels + soin);
    new Ecrire().ecrireUnePhrase(`*Blue*${this.nom}*Reset* récupère *Red*${soin} PV*Reset*.\nPV : *Red*${this.pvActuels}/${this.pvMax}*Reset*`);
  }

  ressusciter(pourcentage: number): void {
    if (this.estVivant()) {
      const soin = Math.floor((this.pvMax * pourcentage) / 100);
      this.pvActuels = Math.min(this.pvMax, this.pvActuels + soin);
      new Ecrire().ecrireUnePhrase(`*Blue*${this.nom}*Reset* est déjà vivant, il est soigné de *Red*${soin} PV*Reset*.\nPV : *Red*${this.pvActuels}/${this.pvMax}*Reset*`);
      return;
    }

    const pvRestaure = Math.floor((this.pvMax * pourcentage) / 100);
    this.pvActuels = Math.max(1, pvRestaure);
    new Ecrire().ecrireUnePhrase(`*Blue*${this.nom}*Reset* est ressuscité avec *Red*${this.pvActuels}/${this.pvMax} PV*Reset* !`);
  }

  attaqueBasique(cible: Character): void {
    if (!this.estVivant()) {
      new Ecrire().ecrireUnePhrase(`*Blue*${this.nom}*Reset* est déjà *Red*K.O*Reset*. Il ne peut pas attaquer.`);
      return;
    }

    new Ecrire().ecrireUnePhrase(`*Blue*${this.nom}*Reset* attaque *Blue*${cible.nom}*Reset* !`);
    cible.subirDegats(this.attaque);
  }

  attaqueMagique(cible: Character): void {
    if (this.pmActuels < this.coutSort) {
      console.log(`${this.nom} n'a pas assez de PM pour lancer un sort.`);
      return;
    }

    this.pmActuels -= this.coutSort;

    // Dégâts magiques : on ignore la défense
    const degats = this.attaque * 2;
    console.log(`${this.nom} lance un sort sur ${cible.nom} et inflige ${degats} dégâts magiques !`);

    // On applique directement les dégâts magiques
    cible.pvActuels = Math.max(0, cible.pvActuels - degats);
    console.log(`${cible.nom} a maintenant ${cible.pvActuels}/${cible.pvMax} PV.`);
  }

  // Soigner une QUANTITÉ brute de PV (utilisé par Potion, MorceauEtoile, DemiEtoile)
  soignerQuantite(quantite: number): void {
    // Tu peux décider si on bloque le soin sur un K.O. ou pas
    this.pvActuels = Math.min(
      this.pvMax,
      this.pvActuels + Math.floor(quantite),
    );
    new Ecrire().ecrireUnePhrase(`*Blue*${this.nom}*Reset* est soigné de *Red*${Math.floor(quantite)} PV*Reset*.\nPV : *Red*${this.pvActuels}/${this.pvMax}*Reset*`);
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
    new Ecrire().ecrireUnePhrase(`*Blue*${this.nom}*Reset* récupère *Green*${Math.floor(quantite)} PM*Reset*. PM : *Green*${this.pmActuels}/${this.pmMax}*Reset*`);
  }

  lireVieMaximum(): number {
    return this.pvMax;
  }

  lireVieActuelle(): number {
    return this.pvActuels;
  }

  lirePMMaximum(): number {
    return this.pmMax;
  }

  lirePMActuel(): number {
    return this.pmActuels;
  }

  protected afficherLesStatistiques(){
    GameManager.instance.afficherLesStatistiques();
  }
}
