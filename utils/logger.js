const fs = require("fs");

module.exports = {
    log: (message) => {
        const line = `[${new Date().toISOString()}] ${message}\n`;
        fs.appendFileSync("logs.txt", line);
    }
};