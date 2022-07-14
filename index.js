const { Client, Intents} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

///////////////////////////// CONSTANTS /////////////////////////////
const TOKEN = "ODM2MDg4Mzg0Mzc1NjE5NTg0.G2rByX.jGvIwcFVH8idPHNrJ-Z0LgR06VLZAkZuo2wUlI";
const json = require('./usr/SkySeasons.json');
const {help, seasontravels, seasonOptions} = require('./usr/functions.js');
const { DataResponde } = require('./usr/DataResponde.js');

///////////////////////////// BOT REAL /////////////////////////////
client.on("ready", () => {
    console.log("[Activo] Bot a iniciado como", client.user.tag);
});

client.on("message", message => {
    if(message.content !== "" && message.author.bot === false){
        const datesSeasons = new DataResponde(message, json);
        const season = datesSeasons.getRequest();

        if (datesSeasons.getisRequest() && season[0] === "--help")
            help(message);
        else if(datesSeasons.getisRequest() && datesSeasons.getPathValid(season[0]))
            seasontravels(datesSeasons, message);
        else if(datesSeasons.getisRequest())
            seasonOptions(datesSeasons, message);
    }
});

client.login(TOKEN);