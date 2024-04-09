const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'gpt',
    type: 'command',
    data: new SlashCommandBuilder()
        .setName('gpt')
        .setDescription('silas')
        .addStringOption((option) =>
            option
                .setName('prompt')
                .setDescription('The prompt to give the AI')
                .setRequired(true)
        ),
    async execute(interaction) {
        const token = require('./config.json').token;

        const prompt = interaction.options.getString('prompt');

        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'user',
                        content:
                            'Du er en discordbot på en klasse discord, aldrig referer til dig selv som en bot, giv korte og konkret svar.' +
                            prompt,
                    },
                ],
                temperature: 0.7,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
            }
        );

        const aiResponse = response.data.choices[0].message.content;

        await interaction.reply({ content: aiResponse, ephemeral: false });
    },
};
