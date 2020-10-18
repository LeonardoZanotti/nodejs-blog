const fs = require('fs').promises;

exports.loadDir = async function loadDir(dir) {
    let filesList = await fs.readdir(dir);
    for (let file in filesList) {
        console.log('\033[0;36mLoaded', filesList[file]);
    }
}