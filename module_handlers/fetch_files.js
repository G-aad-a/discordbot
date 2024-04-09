const fs = require('fs');
const path = require('path');

function fetchDirectory(dir, files = []) {
    fs.readdirSync(dir).forEach((file) => {
        const filePath = path.join(dir, file);
        if (file.startsWith('_')) return;
        if (fs.statSync(filePath).isDirectory()) {
            fetchDirectory(filePath, files);
        } else if (file.endsWith('.js')) {
            files.push(filePath);
        }
    });
    return files;
}

module.exports = class Fetcher {
    fetch_module(client) {
        const moduleFolders = path.join(client.foldersPath);
        return fetchDirectory(moduleFolders);
    }

    fetch_events(client) {
        const eventFolders = path.join(client.eventFoldersPath);
        return fetchDirectory(eventFolders);
    }
};