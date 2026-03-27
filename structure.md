# Structure du Projet Bot Discord

## Description Générale
Ce projet est un bot Discord développé en Node.js utilisant la bibliothèque `discord.js`. Le bot est conçu pour gérer des commandes, des événements et des interactions slash. La structure modulaire permet d'ajouter facilement de nouvelles fonctionnalités sans modifier le code principal.

## Structure des Dossiers et Fichiers

### Racine (`/`)
- **`main.js`** : Fichier principal qui initialise le bot, charge les configurations, commandes et événements. Il gère également les événements de base comme `clientReady` et `messageCreate`.
- **`config.js`** : Contient la configuration du bot, notamment le token Discord nécessaire pour la connexion.
- **`package.json`** : Fichier de configuration npm avec les dépendances et scripts du projet.

### Dossier `commandes/`
Ce dossier contient toutes les commandes du bot. Chaque commande est un fichier JavaScript séparé.

- **Structure d'une commande** :
  - `name` : Nom de la commande (string)
  - `description` : Description de la commande (string)
  - `permission` : Permissions requises (string)
  - `dm` : Si la commande peut être utilisée en messages privés (boolean)
  - `run(bot, message)` : Fonction asynchrone qui exécute la commande

- **Exemples** :
  - `ping.js` : Commande qui affiche la latence du bot
  - `help.js` : Commande d'aide
  - `delete.js` : Commande de suppression

- **Comment ajouter une nouvelle commande** :
  1. Créer un nouveau fichier `.js` dans le dossier `commandes/`
  2. Exporter un objet avec les propriétés requises (name, description, etc.)
  3. Implémenter la logique dans la fonction `run`
  4. Le loader chargera automatiquement la commande au démarrage

### Dossier `Events/`
Ce dossier contient les gestionnaires d'événements Discord.

- **Structure d'un événement** :
  - Chaque fichier exporte une fonction asynchrone qui prend `bot` et les paramètres de l'événement
  - La fonction est appelée automatiquement lorsque l'événement se produit

- **Exemples** :
  - `clientReady.js` : Se déclenche quand le bot est prêt
  - `interactionCreate.js` : Gère les interactions slash
  - `messageCreate.js` : Gère les nouveaux messages (avec réactions automatiques)

- **Comment ajouter un nouvel événement** :
  1. Créer un nouveau fichier `.js` dans le dossier `Events/`
  2. Exporter une fonction asynchrone avec les paramètres appropriés
  3. Le loader l'enregistrera automatiquement

### Dossier `loader/`
Ce dossier contient les utilitaires de chargement.

- **`loadcommands.js`** : Charge toutes les commandes du dossier `commandes/` et les ajoute à `bot.commands`
- **`loadEvents.js`** : Enregistre tous les événements du dossier `Events/`
- **`loadSlashCommands.js`** : Gère le chargement des commandes slash

## Comment Créer de Nouvelles Fonctionnalités

### Ajouter une Commande
1. Créer un fichier dans `commandes/nom-commande.js`
2. Structure minimale :
   ```javascript
   module.exports = {
       name: "nom-commande",
       description: "Description de la commande",
       permission: "Aucune",
       dm: false,
       async run(bot, message) {
           // Logique de la commande
           await message.reply("Réponse");
       }
   };
   ```

### Ajouter un Événement
1. Créer un fichier dans `Events/nom-evenement.js`
2. Structure :
   ```javascript
   module.exports = async (bot, ...parametres) => {
       // Logique de l'événement
   };
   ```

### Ajouter une Commande Slash
- Utiliser le système de chargement slash existant dans `loadSlashCommands.js`
- Les commandes slash sont gérées différemment des commandes classiques

## Dépendances
- `discord.js` : Bibliothèque principale pour l'interaction avec Discord

## Démarrage
- Exécuter `node main.js` pour lancer le bot
- Assurer que le token dans `config.js` est valide

Cette structure permet une extension facile du bot en ajoutant simplement de nouveaux fichiers dans les dossiers appropriés.