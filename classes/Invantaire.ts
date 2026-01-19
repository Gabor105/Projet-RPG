import { Ether } from "./Objets/Ether.ts";
import { MorceauEtoile } from "./Objets/MorceauEtoile.ts";
import { Objet } from "./Objets/Objet.ts";
import { Potion } from "./Objets/Potion.ts";

export class Invantaire {
    private listesDesObjets : Objet[] = [];
    private dictionnaireQuantitées: { [nom: string]: number } = {};

    constructor(){
        this.listesDesObjets.push(new Potion());
        this.listesDesObjets.push(new Potion());
        this.listesDesObjets.push(new Ether());
        this.listesDesObjets.push(new MorceauEtoile());
    }

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
        this.trierListe();
        if (this.trierListe.length == 0){
            console.log("\nVotre sac est vide...");
        } else {
            console.log("\nVotre invantaire contient :");
            this.ecrireLigneListeObjetInvantaire("🧪 Potion");
            this.ecrireLigneListeObjetInvantaire("✨ Morceau d'étoile");
            this.ecrireLigneListeObjetInvantaire("🌟 Demi-étoile");
            this.ecrireLigneListeObjetInvantaire("💊 Éther");
        }
    }
}