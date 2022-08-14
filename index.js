const fs = require('fs');
const {READY_CONSOLE, } = require('./dates/text.js');
require('dotenv').config();
const { Client, GatewayIntentBits, Collection} = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });


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

async function updateStatus() {
    /*
    const guildNum = await client.guilds.cache.size;
    const memberNum = await client. guilds.cache.reduce(
        (prev, guild) => prev + guild.memberCount, 0
    );
    console.log(guildNum, memberNum);
    */ 
    await client.user.setActivity(`/rs help`, {type: "LISTENING"});   
}

setInterval(() => {
    updateStatus();
}, 60000);

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

client.login(process.env.DISCORD_TOKEN);