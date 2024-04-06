const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'setchannel',
    type: 'command',
    data: new SlashCommandBuilder()
        .setName('setchannel')
        .setDescription('Set the channel where suggestions will be sent')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel where suggestions will be sent')
                .setRequired(true)),
    async execute(interaction) {
        fs = require('fs');
        path = require('path');

        const channel = interaction.options.getChannel('channel');

        data = JSON.parse(fs.readFileSync(path.join(interaction.client.foldersPath, 'suggestions/data.json')));
        data[interaction.guild.id] = { suggestionChannel: channel.id, suggestions: {} };
        fs.writeFileSync(path.join(interaction.client.foldersPath, 'suggestions/data.json'), JSON.stringify(data, null, 4));

        await interaction.reply({ content: `Suggestions will now be sent to ${channel}`, ephemeral: true });
    }
};