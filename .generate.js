const PAGES_DIR = "./Sub";

const fs = require("fs");

const list = [];

const directiories = [PAGES_DIR];

while (directiories.length > 0) {
    const dir = directiories.pop();
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const path = dir + "/" + file;
        const stat = fs.statSync(path);

        if (stat.isDirectory()) {
            directiories.push(path);
        } else {
            list.push(path);
        }
    }
}

console.log(`[ ${list.map((f) => `"${f}"`).join(", ")} ]`);