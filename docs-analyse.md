# ANALYSE PROJET RPG — Classes nécessaires

## ÉTAPE 1 — Classe Character

### Responsabilité
Représenter tous les personnages du jeu (aventuriers ET monstres).

### Propriétés (données)
- nom (string) : le nom du personnage
- pointsDeVieMax (number) : PV maximum
- pointsDeVieCourants (number) : PV actuels
- attaque (number) : force d'attaque physique
- defense (number) : résistance aux dégâts physiques
- vitesse (number) : détermine l'ordre de jeu dans les combats

### Méthodes (actions)
- recevoirDegats(degats: number): void
  → Réduit les PV sans descendre sous 0
  
- soigner(pourcentage: number): void
  → Restaure un % de PV sans dépasser le max
  
- ressusciter(pourcentage: number): void
  → Ramène à la vie avec un % de PV
  
- attaquer(cible: Character): void
  → Attaque physique simple (attaque - défense de la cible)
  
- estVivant(): boolean
  → Retourne true si PV > 0, sinon false

### Questions à résoudre plus tard
- Comment différencier un aventurier d'un monstre ?
- Comment gérer les attaques spéciales de chaque classe (Mage, Paladin, etc.) ?
→ Réponse : HÉRITAGE (on verra ça après)


## ÉTAPE 1 — Classe Menu

### Responsabilité
Afficher un menu de choix et récupérer la réponse du joueur.

### Propriétés
- question (string) : le texte affiché au joueur
- options (string[]) : tableau des choix possibles

### Méthodes
- afficher(): number
  → Affiche le menu et retourne l'index du choix (0, 1, 2, etc.)
  → Doit gérer les erreurs (si le joueur tape n'importe quoi)
  → Redemande jusqu'à avoir une réponse valide



## ÉTAPE 1 — Classe Fight

### Responsabilité
Gérer un combat complet entre deux équipes.

### Propriétés
- equipeAventuriers (Character[]) : tableau des aventuriers
- equipeEnnemis (Character[]) : tableau des ennemis
- ordreDeJeu (Character[]) : ordre des personnages selon leur vitesse
- tourActuel (number) : index du personnage qui joue maintenant

### Méthodes
- demarrer(): void
  → Lance le combat
  → Détermine l'ordre de jeu (trier par vitesse)
  → Boucle sur chaque personnage jusqu'à ce qu'une équipe soit KO

- determinerOrdre(): void
  → Trie tous les personnages par vitesse (du plus rapide au plus lent)

- tourSuivant(): void
  → Passe au personnage suivant
  → Vérifie s'il est vivant, sinon saute son tour

- verifierVictoire(): boolean
  → Retourne true si tous les ennemis sont morts

- verifierDefaite(): boolean
  → Retourne true si tous les aventuriers sont morts

### Questions
- Comment chaque personnage joue son tour ?
→ On appellera une méthode du Character qui gère son tour


## ÉTAPE 1 — Classe GameManager

### Responsabilité
Orchestre tout le jeu (menu principal, sélection des personnages, exploration).

### Propriétés
- aventuriers (Character[]) : les 3 aventuriers choisis par le joueur
- salleActuelle (number) : numéro de la salle (1 à 5)

### Méthodes
- demarrer(): void
  → Point d'entrée principal du jeu
  → Affiche le titre
  → Lance la sélection des personnages
  → Lance l'exploration

- selectionnerPersonnages(): void
  → Permet au joueur de choisir 3 aventuriers parmi 6 classes

- lancerExploration(): void
  → Parcourt les 5 salles une par une
  → Pour chaque salle, lance l'action appropriée (combat ou coffre)

### Pour plus tard
- Comment gérer l'inventaire ?
- Comment gérer les différents types de salles ?
→ On créera d'autres classes (Inventaire, Salle, etc.)

