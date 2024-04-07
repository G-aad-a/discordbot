module.exports = async (client) => {
    const fs = require('node:fs');
    const path = require('node:path');

    const moduleFolders = path.join(client.foldersPath);

    let files = [];

    function fetchDirectory(dir) {
        fs.readdirSync(dir).forEach((file) => {
            // console.log(dir, file);
            if (file.split('\\').slice(-1)[0].startsWith('_')) return;
            if (fs.statSync(path.join(dir, file)).isDirectory())
                return fetchDirectory(path.join(dir, file));
            else if (file.endsWith('.js'))
                return files.push(path.join(dir, file));
        });
    }

    fetchDirectory(moduleFolders);
    return files;
};
