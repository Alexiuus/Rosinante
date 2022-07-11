const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });


///////////////////////////// CONSTANTS /////////////////////////////
const TOKEN = "ODM2MDg4Mzg0Mzc1NjE5NTg0.G2rByX.jGvIwcFVH8idPHNrJ-Z0LgR06VLZAkZuo2wUlI";
const PREFIX = "rs!";
const json = require('./SkySeasons.json');
const GIF_HELP = "img/tenor.gif";
const COMMENT = ":one: If you use \`rs!\` Rosinante will respond with \`The Seasons Of \
Sky\`. \n\n :two: If you use \`rs! <season>\` (<season> is the season you want to watch) Rosinante \
will respond with \`the travelers of the chosen season.\` \n\n :three: If you use \`rs! \
<season>/<traveler>\` (<traveler> is the traveler you want to watch) Rosinante will \
respond with your accessories. \n\n :four: If you use \`rs! <season>/<traveler>/<accessory>\` \
(<accessory> is the accessory you want to watch) Rosinante will respond with her photos.";

///////////////////////////// FUNCTIONS /////////////////////////////
function seasonOptions(message, jsonMap, HexColor){
    
    const embed = new MessageEmbed().setTitle("☆｡Sky Seasons｡☆")
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setColor(HexColor);

    jsonMap.forEach(
    (sky, val) => embed.addField(`:sparkles: ${val}`, 
                            `:stars:\`Travellers: ${Object.entries(sky).length}\``, true)
    );

    message.channel.send({ embeds: [embed] });
}
function accFiles(sky, message, acc, HexColor){

    const embed = new MessageEmbed().setTitle(`:sparkles: ${sky[0]}-:stars:${sky[1]}: ${sky[2]}`)
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setColor(HexColor)
    .addField("Value", acc.precio)
    .setImage('attachment://' + acc.file);

    const msg = { embeds: [embed], files: ["./" + acc.file] };

    message.channel.send(msg);
}

function travelsAccess(sky, message, access, HexColor){

    const accMap = new Map(Object.entries(access));
    const embed = new MessageEmbed().setTitle(`:sparkles: ${sky[0]}: :stars:${sky[1]}`)
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setColor(HexColor);

    if(sky.length <= 2 || !accMap.has(sky[2])){   
        embed.addField(`:stars:${sky[1]}`, `\`\`\`\n${Object.entries(access).reduce(
            (prev, curr) => {
                return prev + ((curr[0] !== "totalValue")? curr[0] + "\n" : "");
            }, "")}\`\`\``
        );

        message.channel.send({ embeds: [embed] });
    }else{
        accFiles(sky, message, accMap.get(sky[2]), HexColor);
    }

}

function seasontravels(sky, message, jsonMap, HexColor){

    const travelMap = new Map(Object.entries(jsonMap.get(sky[0])));
    const embed = new MessageEmbed().setTitle(`:sparkles: ${sky[0]}`)
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setColor(HexColor);

    if (sky.length <= 1 || !travelMap.has(sky[1])){
        travelMap.forEach(
            (values, viajero) => embed.addField(`:stars:${viajero}`, 
                                `:coin:: (${Object.entries(values)[0][1]})`)
        );
        message.channel.send({ embeds: [embed] });
    }else{
        travelsAccess(sky, message, travelMap.get(sky[1]), HexColor);
    }   
}

function rolColor(message){
    const roles = message.guild.roles.cache;
    
    const rol = roles.find(r => (roles.get(r.id).members.filter(
        (k) => k.user.username === message.author.username 
    ).size !== 0) && r.name.includes("Cape"));
    return (rol !== undefined)? rol.hexColor: "#000000";
}

function help(message, HexColor){
    const embed = new MessageEmbed().setTitle(`:white_check_mark: Rosinante Guide :blush:`)
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setColor(HexColor)
    .addField("How to use Rosinante:grey_question:", COMMENT)
    .setImage('attachment://' + GIF_HELP);
    message.channel.send({ embeds: [embed], files: [`./${GIF_HELP}`] });
}

///////////////////////////// BOT REAL /////////////////////////////
client.on("ready", () => {
    console.log("[Activo] Bot a iniciado como", client.user.tag);
});

client.on("message", message => {
    if(message.content !== "" && message.author.bot === false){
        const jsonMap = new Map(Object.entries(json));
        const msg = message.content.split(" ");
        const sSon = ((msg.length <= 1)? "" : msg[1]).split("/");
        const HexColor = rolColor(message);
        if (msg[0] === PREFIX && sSon[0] === "--help"){
            console.log
            help(message, HexColor);
        } else if (msg[0] === PREFIX){
            (!jsonMap.has(sSon[0]))? 
                seasonOptions(message, jsonMap, HexColor) : 
                seasontravels(sSon, message, jsonMap, HexColor);
        }
    }
});

client.login(TOKEN);