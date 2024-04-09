const { Collection } = require('discord.js');

module.exports = async (client) => {
    const fs = require('fs');

    const fetcher = new (require('./fetch_files.js'))();

    const files = await fetcher.fetch_module(client);
    files.forEach((file) => {
        const command = require(file);
        switch (command.type) {
            case 'command':
                client.commands.set(command.name, command);
                break;
            case 'subcommand':
                if (client.subcommands.has(command.parent)) {
                    client.subcommands
                        .get(command.parent)
                        .set(command.name, command);
                    break;
                } else {
                    client.subcommands.set(
                        command.parent,
                        new Collection().set(command.name, command)
                    );
                }
                break;
            case 'modal':
                client.modals.set(command.name, command);
                break;
            case 'button':
                client.buttons.set(command.name, command);
                break;
            case 'startup':
                command.execute(client);
                break;
            default:
                console.log(`Unknown module type: ${command.type}`);
        }
    });
};
