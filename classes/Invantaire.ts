import {Ecrire} from "../Ecrire.ts";
import {Aventurier} from "./Aventurier.ts";
import {GameManager} from "./gestion-du-jeu/GameManager.ts";
import {DemiEtoile} from "./Objets/DemiEtoile.ts";
import { Ether } from "./Objets/Ether.ts";
import { MorceauEtoile } from "./Objets/MorceauEtoile.ts";
import { Objet } from "./Objets/Objet.ts";
import { Potion } from "./Objets/Potion.ts";
import {Choix} from "./utils/Choix.ts";

export class Invantaire {
    public static _instance : Invantaire;
    private listesDesObjets : Objet[] = [new Potion(), new Potion(), new Ether(), new MorceauEtoile()];
    private dictionnaireQuantitées: { [nom: string]: number } = {};
    private objetPossible : string[] = ["🧪 Potion","✨ Morceau d'étoile","🌟 Demi-étoile","💊 Éther"];
    private ecrire : Ecrire = new Ecrire();

    public static get instance(){
        if (!Invantaire._instance){
            Invantaire._instance = new Invantaire();
        }
        return Invantaire._instance;
    }

    private constructor(){}

    public ajouterObjet(objet:Objet){
        this.listesDesObjets.push(objet);
    }

    public objetEstDansLeSac(objet:Objet):boolean{
        const nomObjetRecherche = objet.connaitreNomObjet();
        for(const obj of this.listesDesObjets){
            if (obj.connaitreNomObjet() == nomObjetRecherche){
                return true;
            }
        }
        return false;
    }

    public retirerUnObjet(nomObjetRecherche:string){
        // const nomObjetRecherche = objet.connaitreNomObjet();
        for (let i = 0; i < this.listesDesObjets.length; i++) {
            if (this.listesDesObjets[i].connaitreNomObjet() == nomObjetRecherche){
                this.listesDesObjets.splice(i, 1);
                return;
            }
        }
    }

    private trierListe(){
        this.dictionnaireQuantitées = {};
        for (const obj of this.listesDesObjets){
            const nom : string = obj.connaitreNomObjet();
            if (nom.length > 0){
                const valeurPrécédante : number | null = this.dictionnaireQuantitées[nom];
                if (valeurPrécédante == null){
                    this.dictionnaireQuantitées[nom]=1;
                } else {
                    this.dictionnaireQuantitées[nom]=valeurPrécédante+1;
                }
            }
        }
    }

    
    private ecrireLigneListeObjetInvantaire(nom:string){
        const valeur : number | null = this.dictionnaireQuantitées[nom];
        if (valeur != null && valeur > 0){
            console.log(`| ${valeur} ${nom}`);
        }
    }
    public listeObjetInvantaire(){
        // console.log(this.listesDesObjets.length);
        this.trierListe();
        if (this.dictionnaireQuantitées.length === 0){
            console.log("\nVotre sac est vide...");
        } else {
            console.log("\nVotre invantaire contient :");
            for (let i = 0; i < this.objetPossible.length; i++) {
                this.ecrireLigneListeObjetInvantaire(this.objetPossible[i]);
            }
            console.log("");
        }
    }

    public async choisirUnObjetAConsomer(){
        let phrase = "Quel objets shouaiter vous utilisé ?";
        let listeNom : string[] = [];
        for (let i = 0; i < this.objetPossible.length; i++) {
            if (this.dictionnaireQuantitées[this.objetPossible[i]] && this.dictionnaireQuantitées[this.objetPossible[i]] > 0){
                listeNom.push(this.objetPossible[i]);
            }
        }
        if (listeNom.length == 0) return;

        const choix = new Choix();
        const valeur = await choix.faireUnChoix(listeNom)-1;
        this.ecrire.ecrireUnePhrase(`Sur qui voulez-vous utiliser *Green*${listeNom[valeur]}*Reset* ?`);
        const onPrendLesPerdu = listeNom[valeur] == "✨ Morceau d'étoile" || listeNom[valeur] == "🌟 Demi-étoile";
        const listeNomPersonnage : string[] = [];
        const listeNomPersonnageAventurier : Aventurier[] = [];
        for (let i = 0; i < GameManager.instance.equipeA.length; i++) {
            if (onPrendLesPerdu || GameManager.instance.equipeA[i].pvActuels > 0){
                listeNomPersonnage.push(GameManager.instance.equipeA[i].nom);
                listeNomPersonnageAventurier.push(GameManager.instance.equipeA[i]);
            }         
        }
        const valeur2 = await choix.faireUnChoix(listeNomPersonnage)-1;

        switch (listeNom[valeur]) {
            case "🧪 Potion":
                new Potion().utiliserObjet(listeNomPersonnageAventurier[valeur2]);
                break;
            case "✨ Morceau d'étoile":
                new MorceauEtoile().utiliserObjet(listeNomPersonnageAventurier[valeur2]);
                break;
            case "🌟 Demi-étoile":
                new DemiEtoile().utiliserObjet(listeNomPersonnageAventurier[valeur2]);
                break;
            case "💊 Éther":
                new Ether().utiliserObjet(listeNomPersonnageAventurier[valeur2]);
                break;
        }
    }
}