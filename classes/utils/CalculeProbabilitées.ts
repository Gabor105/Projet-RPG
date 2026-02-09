export class CalculeProbabilitées{
    public static probabilitées(probabilitéesNombre:number[], nombreProbabilitéPhrases:number):number{
        let total : number = 0;
        for (let k of probabilitéesNombre) {
            total += k
        }
        const probabilité = Math.floor(Math.random() * total);

        let sommeCumulative = 0;
        for (let i = 0; i < probabilitéesNombre.length; i++) {
            sommeCumulative += probabilitéesNombre[i];
            if (probabilité < sommeCumulative){
                return i;
            }
        }
        return 0;
    }
}