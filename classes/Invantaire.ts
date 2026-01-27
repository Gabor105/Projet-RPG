import { Ether } from "./Objets/Ether.ts";
import { MorceauEtoile } from "./Objets/MorceauEtoile.ts";
import { Objet } from "./Objets/Objet.ts";
import { Potion } from "./Objets/Potion.ts";

export class Invantaire {
    public static _instance : Invantaire;
    private listesDesObjets : Objet[] = [new Potion(), new Potion(), new Ether(), new MorceauEtoile()];
    private dictionnaireQuantitées: { [nom: string]: number } = {};

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

    public retirerUnObjet(objet:Objet){
        const nomObjetRecherche = objet.connaitreNomObjet();
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
            this.ecrireLigneListeObjetInvantaire("🧪 Potion");
            this.ecrireLigneListeObjetInvantaire("✨ Morceau d'étoile");
            this.ecrireLigneListeObjetInvantaire("🌟 Demi-étoile");
            this.ecrireLigneListeObjetInvantaire("💊 Éther");
            console.log("");
        }
    }

    public choisirUnObjetAConsomer(){
        let phrase = "Quel objets shouaiter vous utilisé ?";
        let listeNom : string[] = [];
        let listeNumber : string[] = [];
        for (let k = 0; k < this.dictionnaireQuantitées.length; k++) {
            if (this.dictionnaireQuantitées[k] > 0){
                listeNom.push(this.dictionnaireQuantitées[k].toString());
                listeNumber.push(k.toString());
                phrase += `${k+1} - ${this.dictionnaireQuantitées[k].toString()}`
            }
        }
        console.log("/!\\ La fonction sera terminé plus tard /!\\ ");
        // switch (this.JoueurFaitUnChoix(listeNumber,phrase)) {
        //     case "1" :
        //         this.ajouterObjet(listeNom)
        // }
    }
}