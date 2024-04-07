module.exports = async (client) => {
    const fs = require('fs');

    const fetch_files = require('./fetch_files.js');

    const files = await fetch_files(client);

    files.forEach((file) => {
        const command = require(file);
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
            case 'startup':
                command.execute(client);
                break;
            default:
                console.log(`Unknown module type: ${command.type}`);
        }
    });
};
