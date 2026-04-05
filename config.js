require("dotenv").config();
const token = process.env.TOKEN;
const api_key = process.env.API_KEY;
const model = process.env.MODEL;
const system_prompt = `Tu es un assistant technique pour une école d'informatique.
Tu réponds en français, de manière claire et adaptée à la complexité de la question.
Tu vas toujours jusqu'au bout de ta réponse, sans jamais te couper.
Si tu ne sais pas, dis-le.`

const agent_id = process.env.AGENT_ID;



module.exports = {

    token: process.env.TOKEN,
    api_key: process.env.API_KEY,
    model: process.env.MODEL,
    system_prompt,
    agent_id,
}