require("dotenv").config();
const token = process.env.TOKEN;
const api_key = process.env.API_KEY;
const model = process.env.MODEL;
const system_prompt = "You are an AI Assistant in a Discord Server."



module.exports = {

    token: process.env.TOKEN,
    api_key: process.env.API_KEY,
    model: process.env.MODEL,
    system_prompt,
}