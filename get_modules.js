module.exports = async (client) => {
    const fs = require('node:fs');
    const path = require('node:path');

    const foldersPath = path.join(__dirname, 'modules');
    client.foldersPath = foldersPath;
    const moduleFolders = fs.readdirSync(foldersPath);

    for (const modfolder of moduleFolders) {
        modpath = path.join(foldersPath, modfolder);
        const moduleFiles = fs.readdirSync(modpath).filter(file => file.endsWith('.js'));
        for (const file of moduleFiles) {
            console.log(file);
            if (file.startsWith('_')) continue;
            const command = require(path.join(modpath, file));
            switch (command.type) {
                case 'command':
                    client.commands.set(command.name, command);
                    break;
                case 'modal':
                    client.modals.set(command.name, command);
                    break;
                case 'button':
                    client.buttons.set(command.name, command);
                    break;
                default:
                    console.log(`Unknown module type: ${command.type}`);
            }
        }
    }
}