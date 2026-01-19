export class Ecrire {
    private static readonly styleMap: { [key: string]: string } = {
        // styles
        "*Reset*": "\x1b[0m",
        "*Bold*": "\x1b[1m",
        "*Dim*": "\x1b[2m",
        "*Italic*": "\x1b[3m",
        "*Underline*": "\x1b[4m",
        "*Blink*": "\x1b[5m",
        "*Reverse*": "\x1b[7m",
        "*Hide*": "\x1b[8m",
        "*Strike*": "\x1b[9m",
        // Couleurs de police
        "*Black*": "\x1b[30m",
        "*Red*": "\x1b[31m",
        "*Green*": "\x1b[32m",
        "*Yellow*": "\x1b[33m",
        "*Blue*": "\x1b[34m",
        "*Magenta*": "\x1b[35m",
        "*Cyan*": "\x1b[36m",
        "*White*": "\x1b[37m",
        "*Gray*": "\x1b[90m",
        // Couleurs de fonds
        "*BlackBg*": "\x1b[40m",
        "*RedBg*": "\x1b[41m",
        "*GreenBg*": "\x1b[42m",
        "*YellowBg*": "\x1b[43m",
        "*BlueBg*": "\x1b[44m",
        "*MagentaBg*": "\x1b[45m",
        "*CyanBg*": "\x1b[46m",
        "*WhiteBg*": "\x1b[47m",
        "*GrayBg*": "\x1b[100m",
    };

    public EcrireUnePhrase(phrase: string) {
        for (const key in Ecrire.styleMap) {
            phrase = phrase.replaceAll(key, Ecrire.styleMap[key]);
        }
        process.stdout.write(phrase + "\x1b[0m");
    }
}

let écriture = new Ecrire();
écriture.EcrireUnePhrase(`*GrayBg*Bonjour, *Reset**Red*voici*Reset* un texte\n`);