module.exports = async () => {
    const { REST, Routes } = require('discord.js');
    const { clientId, guildId, token } = require('./config.json');
    const fs = require('node:fs');
    const path = require('node:path');

    const commands = [];
    const foldersPath = path.join(__dirname, 'modules');
    const moduleFolders = fs.readdirSync(foldersPath);

    for (const modfolder of moduleFolders) {
        modpath = path.join(foldersPath, modfolder);
        const moduleFiles = fs.readdirSync(modpath).filter(file => file.endsWith('.js'));
        for (const file of moduleFiles) {
            if (file.startsWith('_')) continue;
            const command = require(path.join(modpath, file));
            if (command.type === 'command') {
                commands.push(command.data.toJSON());
            }
        }
    }

    // Construct and prepare an instance of the REST module
    const rest = new REST().setToken(token);

    // and deploy your commands!
    (async () => {
        try {
            console.log(`Started refreshing ${commands.length} application (/) commands.`);

            // The put method is used to fully refresh all commands in the guild with the current set
            const data = await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: commands },
            );

            console.log(`Successfully reloaded ${data.length} application (/) commands.`);
        } catch (error) {
            // And of course, make sure you catch and log any errors!
            console.error(error);
        }
    })();
}