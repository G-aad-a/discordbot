const embed = require('./_suggestionEmbed.js');

module.exports = {
    type: 'startup',

    execute(client) {
        const fs = require('fs');
        const path = require('path');

        setInterval(async () => {
            const data = JSON.parse(fs.readFileSync(path.join(client.foldersPath, 'suggestions/data.json')));
            for (const guild in data) {
                for (const suggestionId in data[guild].suggestions) {
                    const suggestion = data[guild].suggestions[suggestionId];
                    if (suggestion.time < Date.now()) {
                        suggestion.status = "done";
                        fs.writeFileSync(path.join(client.foldersPath, 'suggestions/data.json'), JSON.stringify(data, null, 4));
                    };

                    const message = await client.channels.cache.get(data[guild].suggestionChannel).messages.fetch(suggestionId);

                    const em = await embed(suggestion.title, suggestion.description, suggestion.upvotes.length, suggestion.downvotes.length, suggestion.time, suggestion.status);
                    await message.edit({ embeds: [em] });
                }
            }
        }, 1000*6);
    }
}