const { PermissionsBitField } = require('discord.js');

module.exports = async (interaction) => {
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(
            `No command matching ${interaction.commandName} was found.`
        );
        return;
    }

    if (
        command.permissions === 'admin' &&
        !interaction.member.permissions.has(
            PermissionsBitField.Flags.Administrator
        )
    )
        return interaction.reply({
            content:
                'You do not have the required permissions to use this command.',
            ephemeral: true,
        });

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: 'There was an error while executing this command!',
                ephemeral: true,
            });
        } else {
            await interaction.reply({
                content: 'There was an error while executing this command!',
                ephemeral: true,
            });
        }
    }
};
