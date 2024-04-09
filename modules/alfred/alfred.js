const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'invite',
    type: 'command',
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Laver ro og orden'),

    async execute(interaction) {
        const invite = await interaction.channel.createInvite({
            maxAge: 0,
            maxUses: 0
        });

        await interaction.reply({ content: `${invite.url}`, ephemeral: true });
    },
};