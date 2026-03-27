const fs = require("fs");

let data = {};

if (fs.existsSync("data.json")) {
    data = JSON.parse(fs.readFileSync("data.json"));
}

module.exports = {
    get: (key) => data[key],
    set: (key, value) => {
        data[key] = value;
        fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
    }
};