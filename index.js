const { user, oauth, channel } = require('./config.json');

const tmi = require('tmi.js');

const client = new tmi.Client({
    options: { debug: true, messagesLogLevel: "info" },

    connection: {
        reconnect: true,
        secure: true
    },

    identity: {
        username: user,
        password: oauth
    },

    channels: [channel]
});

client.connect().catch(console.error);

client.on('message', (channel, tags, message, self) => {
    if (self || !message.startsWith("$")) return;

    const args = message.substring(1).split(" ");
	const command = args.shift().toLowerCase();

    switch (command) {
        case 'ping':
            client.say(channel, 'Pong!');
            break;
        case 'discord':
            client.say(channel, 'https://discord.gg/3YrnqDfEH2');
            break;
        default:
            client.say(channel, 'Unknown command.');
            break;
    }

});