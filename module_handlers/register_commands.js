module.exports = async (client) => {
    const {
        REST,
        Routes,
        ChannelType,
        SlashCommandBuilder,
    } = require('discord.js');
    const { clientId, guildId, token } = require('../config.json');

    const fetch_files = require('./fetch_files.js');

    const commands = [];
    const files = await fetch_files(client);

    files.forEach((file) => {
        const command = require(file);
        if (command.type === 'subcommand') {
            if (!command.parent) {
                console.error(
                    `Subcommand ${command.name} does not have a parent!`
                );
                return;
            }

            const parent = commands.find(
                (parent) => parent.name === command.parent
            );

            if (!parent) {
                commands.push(
                    new SlashCommandBuilder()
                        .setName(command.parent)
                        .setDescription('A parent command')
                        .toJSON()
                );
            }
            const parentIndex = commands.findIndex(
                (parent) => parent.name === command.parent
            );
            commands[parentIndex].options.push(command.data.toJSON());
        } else if (command.type === 'command') {
            commands.push(command.data.toJSON());
        }
    });

    // Construct and prepare an instance of the REST module
    const rest = new REST().setToken(token);

    // and deploy your commands!
    (async () => {
        try {
            let subcommands = 0;
            commands.forEach((command) => {
                command.options.forEach((option) => {
                    if (option.type == 1) {
                        subcommands += 1;
                    }
                });
            });

            console.log(
                `Started refreshing ${commands.length} applications with ${subcommands} subcommands (/) commands.`
            );

            // The put method is used to fully refresh all commands in the guild with the current set
            const data = await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                // Routes.applicationCommands(clientId),
                { body: commands }
            );

            console.log(
                `Successfully reloaded ${data.length} application (/) commands.`
            );
        } catch (error) {
            // And of course, make sure you catch and log any errors!
            console.error(error);
        }
    })();
};
