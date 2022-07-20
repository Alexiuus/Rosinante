const fs = require('fs');
require('./dates/text.js');
const { token } = require('./dates/config.json');
const { Client, Intents, Collection} = require('discord.js');
const { READY_CONSOLE } = require('./dates/text.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
///////////////////////////// CONSTANTS /////////////////////////////

client.commands = new Collection();
const commandFile = fs.readdirSync('./commands').filter(r => r.endsWith('.js'));

commandFile.forEach(
    file =>  {
        const command = require(`./commands/${file}`);
        client.commands.set(command.data.name, command);
    }
);

///////////////////////////// BOT REAL /////////////////////////////
client.on("ready", () => {
    console.log(READY_CONSOLE, client.user.tag);
});

client.on("interactionCreate", async interaction => {
    if(!interaction.isCommand() && interaction.user.bot === true) return
    const command = client.commands.get(interaction.commandName);
    if(!command) return

    try{
        await command.run(interaction);
    }catch(e){
        console.log(e);
    }
});

client.login(token);