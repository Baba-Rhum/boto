require("dotenv").config();
const token = process.env.TOKEN;

module.exports = {

    token: process.env.TOKEN,
    guildId: "" // Laisse vide pour enregistrer globalement, ou mets un vrai ID de serveur
}