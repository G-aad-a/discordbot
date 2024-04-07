module.exports = async (interaction) => {
    const button = interaction.client.buttons.get(
        interaction.customId.split(' ')[0]
    );

    if (!button) {
        console.error(
            `No button matching ${
                interaction.customId.split(' ')[0]
            } was found.`
        );
        return;
    }

    try {
        await button.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: 'There was an error while executing this button!',
                ephemeral: true,
            });
        } else {
            await interaction.reply({
                content: 'There was an error while executing this button!',
                ephemeral: true,
            });
        }
    }
};
