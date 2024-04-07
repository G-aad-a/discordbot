module.exports = async (interaction) => {
    const modal = interaction.client.modals.get(
        interaction.customId.split(' ')[0]
    );

    if (!modal) {
        console.error(
            `No modal matching ${interaction.customId.split(' ')[0]} was found.`
        );
        return;
    }

    try {
        await modal.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: 'There was an error while executing this modal!',
                ephemeral: true,
            });
        } else {
            await interaction.reply({
                content: 'There was an error while executing this modal!',
                ephemeral: true,
            });
        }
    }
};
