const { PermissionsBitField } = require('discord.js');

module.exports = async (interaction) => {
    const parentcommand = interaction.client.subcommands.get(
        interaction.commandName
    );
    const command = parentcommand.get(interaction.options.getSubcommand());

    if (!command) {
        console.error(
            `No subcommand matching ${interaction.options.getSubcommand()} was found.`
        );
        return;
    }

    if (command.permissions) {
        let requiredPermissions = command.permissions.map(
            (permission) => PermissionsBitField.Flags[permission]
        );

        let hasRequiredPermissions = requiredPermissions.every((permission) =>
            interaction.member.permissions.has(permission)
        );

        if (!hasRequiredPermissions) {
            return interaction.reply({
                content:
                    'You do not have the required permissions to use this subcommand.',
                ephemeral: true,
            });
        }
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: 'There was an error while executing this subcommand!',
                ephemeral: true,
            });
        } else {
            await interaction.reply({
                content: 'There was an error while executing this subcommand!',
                ephemeral: true,
            });
        }
    }
};
