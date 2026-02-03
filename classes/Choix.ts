import { Ecrire } from "../Ecrire.ts";
import * as readline from 'node:readline';

export class Choix {
    ecrire = new Ecrire();
    private stop: boolean = false;

    public async FaireUnChoix(liste: string[]): Promise<number> {
        let cible: number = 0;
        let déjàEcrit : boolean = false;
        const nombreASuprimer : number = liste.length+2;
        
        readline.emitKeypressEvents(process.stdin);
        if (process.stdin.isTTY) {
            process.stdin.setRawMode(true);
        }
        process.stdin.resume();

        return new Promise((resolve) => {
            const afficherMenu = () => {
                if (déjàEcrit) this.ecrire.EffacerLigne(nombreASuprimer);
                déjàEcrit = true;
                console.log("Utilisez les flèches ↑↓ et Espace pour valider :\n");
                
                liste.forEach((item, i) => {
                    if (cible === i) {
                        this.ecrire.EcrireUnePhrase("*Red*• "+liste[i]+"\n");
                    } else {
                        this.ecrire.EcrireUnePhrase("○ "+liste[i]+"\n");
                    }
                });
            };

            afficherMenu();

            const onKeypress = (str: string, key: any) => {
                const n = liste.length;
                if (key.name === 'up') {
                    cible = (((cible-1)%n)+n)%n;
                    afficherMenu();
                } else if (key.name === 'down') {
                    cible = (((cible+1)%n)+n)%n;
                    afficherMenu();
                } else if (key.name === 'space') {
                    process.stdin.removeListener('keypress', onKeypress);
                    if (process.stdin.isTTY) process.stdin.setRawMode(false);
                    process.stdin.pause(); 
                    
                    this.ecrire.EffacerLigne(nombreASuprimer);
                    resolve(cible+1); 
                } else if (key.ctrl && key.name === 'c') {
                    process.exit();
                }
            };

            process.stdin.on('keypress', onKeypress);
        });
    }
}

// Utilisation :
// const test = new Choix();

// let index = 0;
// await test.FaireUnChoix(["Option 1", "Option 2", "Option 3"]).then((indexReçus) => { index = indexReçus; });

// console.log(`Vous avez choisi l'index : ${index}`);
