module.exports = async (client) => {
    
    const fetcher = new (require('./fetch_files.js'))();

    const files = await fetcher.fetch_events(client);

    files.forEach((file) => {
        const event = require(file);
        if (event.once) {
            client.once(event.name, (...args) => event.run(client, ...args))
        } else {
            client.on(event.name, (...args) => event.run(client, ...args))
        }
    });

    console.log(`Successfully registered ${files.length} events!`)
};
