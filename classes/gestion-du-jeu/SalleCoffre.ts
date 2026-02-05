import {DemiEtoile} from "../Objets/DemiEtoile.ts";
import {Ether} from "../Objets/Ether.ts";
import {MorceauEtoile} from "../Objets/MorceauEtoile.ts";
import {Objet} from "../Objets/Objet.ts";
import {Potion} from "../Objets/Potion.ts";
import { Invantaire } from "../Invantaire.ts";
import { Ecrire } from "../../Ecrire.ts";
import {GameManager} from "./GameManager.ts";
import {Choix} from "../utils/Choix.ts"

export class SalleCoffre{
    private objets : Objet[] = [];
    private probabilitéDePiège : number = 20; // ces un pourcentage
    private ecrire = new Ecrire();
    private dégàEnCasDePiège:number=20;

    public async ouvrirCoffre(){
        this.ecrire.EcrireUnePhrase("Vous avez trouver un *Blue*coffre*Reset* !\n");
        this.ecrire.EcrireUnePhrase("Mais c'est peut-être un piège... Quel personnages vas prendre le risque de l'ouvrir ?\n");
        const listeNom : string[] = [];
        for (let i = 0; i < GameManager.instance.equipeA.length; i++) {
            if (GameManager.instance.equipeA[i].pvActuels > 0){
                listeNom.push(`${i+1} - ${GameManager.instance.equipeA[i].nom}`);
            }
        }
        if (listeNom.length == 0){
            this.ecrire.EcrireUnePhrase("Personne n'est en état d'ouvrir se coffre...\n");// cette phrasse ne doit jamais être afficher.
            return;
        }
        const choix = new Choix();
        const valeur = await choix.FaireUnChoix(listeNom)-1;
        this.ecrire.EcrireUnePhrase(`*Green*${GameManager.instance.equipeA[valeur].nom}*Reset* ouvre le coffre !\n`);
            
        const random = Math.floor(Math.random() * 101);
        if (random<=this.probabilitéDePiège){
            this.ecrire.EcrireUnePhrase(`C'était un piège !\n`);
            GameManager.instance.equipeA[valeur].subirDegats(this.dégàEnCasDePiège);
        } else {
            this.ecrire.EcrireUnePhrase(`Ce n'était pas un piège !\n`);
            if (random <= 5){
                this.cadeauDuCoffre(new Ether());
            }
            if (random <= 10){
                this.cadeauDuCoffre(new MorceauEtoile());
            }
            if (random <= 15){
                this.cadeauDuCoffre(new Potion());
            }
            this.cadeauDuCoffre(new DemiEtoile());
            this.cadeauDuCoffre(new Potion());
            
            // affichage pour l'utilisateur :
            if (this.objets.length == 0){
                this.ecrire.EcrireUnePhrase("Oh non ! Il était vide...\n");// cela ne doit jamais être afficher.
            } else {
                this.ecrire.EcrireUnePhrase("\nVous avez obtenu :\n");
                for (let i = 0; i < this.objets.length; i++) {
                    this.ecrire.EcrireUnePhrase(`| *Green*${this.objets[i].connaitreNomObjet()}*Reset*\n`);
                }            
            }
        }
        await sleep(2000);
        console.log("\n");
    }

    private cadeauDuCoffre(objet:Objet){
        if (this.objets.length < 2){
            this.objets.push(objet);
            Invantaire.instance.ajouterObjet(objet);
        }
    }
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));