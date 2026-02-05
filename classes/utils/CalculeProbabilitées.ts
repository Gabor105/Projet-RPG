export class CalculeProbabilitées{
    public static Probabilitées(probabilitéesNombre:number[], nombreProbabilitéPhrases:number):number{
        let total : number = 0;
        for (let k of probabilitéesNombre) {
            total += k
        }
        const probabilité = Math.floor(Math.random() * total+1);

        for (let i = 0; i < probabilitéesNombre.length; i++) {
            if (nombreProbabilitéPhrases>i){
                if (probabilité < probabilitéesNombre[i]){
                    return i;
                }
            }
        }
        return 0;
    }
}