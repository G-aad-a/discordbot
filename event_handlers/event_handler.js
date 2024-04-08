module.exports = async (interaction) => {
    const command = require('./command.js');
    const subcommand = require('./subcommand.js');
    const modal = require('./modal.js');
    const button = require('./button.js');

    if (interaction.isChatInputCommand()) {
        if (interaction.type == 1) {
            subcommand(interaction);
        } else {
            command(interaction);
        }
    } else if (interaction.isModalSubmit()) {
        modal(interaction);
    } else if (interaction.isButton()) {
        button(interaction);
    } else {
        console.error(`Unknown interaction type: ${interaction.type}`);
    }
};
