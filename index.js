const { Client, Intents, MessageEmbed, MessageAttachment } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });


///////////////////////////// CONSTANTS /////////////////////////////
const TOKEN = "ODM2MDg4Mzg0Mzc1NjE5NTg0.G2rByX.jGvIwcFVH8idPHNrJ-Z0LgR06VLZAkZuo2wUlI";
const PREFIX = "img";
const json = require('./SkySeasons.json');


///////////////////////////// FUNCTIONS /////////////////////////////
function seasonOptions(message, jsonMap, rol){
    
    const embed = new MessageEmbed().setTitle("Temporadas de SKY")
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setColor(rol.hexColor);

    jsonMap.forEach(
        (sky, val) => embed.addField(val, Object.entries(sky).reduce(
            (prev, curr) =>{
                return curr[0] + " " + curr[1].precio+ "\n" + prev;
            }, "")
        )
    );

    message.channel.send({ embeds: [embed] });
}
function accFiles(sky, message, accMap, rol){

    const embed = new MessageEmbed().setTitle(sky[0] + "-" + sky[1] + ": " + sky[2])
    .setColor(rol.hexColor)
    .addField("precio", accMap.get(sky[2]).precio)
    .setImage('attachment://' + accMap.get(sky[2]).file);;

    message.channel.send({ embeds: [embed], files: ['./' + accMap.get(sky[2]).file] });
}

function travelsAccess(sky, message, travelMap, rol){

    const accMap = new Map(Object.entries(travelMap.get(sky[1])));
    const embed = new MessageEmbed().setTitle(sky[0] + ": " + sky[1])
    .setColor(rol.hexColor);

    if(sky.length <= 2 || !accMap.has(sky[2])){
        accMap.forEach(
            (values, accesorio) => {
                if (accesorio !== "precio")
                    embed.addField(accesorio, values.precio);
            }  
        );
    
        message.channel.send({ embeds: [embed] });
    }else{
        accFiles(sky,message,accMap, rol);
    }

}

function seasontravels(sky, message, jsonMap, rol){
    
    const travelMap = new Map(Object.entries(jsonMap.get(sky[0])));
    const embed = new MessageEmbed().setTitle(sky[0])
    .setColor(rol.hexColor);

    if (sky.length <= 1 || !travelMap.has(sky[1])){
        travelMap.forEach(
            (values, viajero) => embed.addField(viajero, Object.entries(values).reduce(
                (curr, prev) =>{
                    return prev[0] + ": 0 :candle:, 0 :heart:" + "\n" + curr;
                }, "")
            )
        );

        message.channel.send({ embeds: [embed] });
    }else{
        travelsAccess(sky, message, travelMap, rol);
    }   
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
        const rol = message.guild.roles.cache.find(r => (message.guild.roles.cache.get(r.id).members.filter(
            (k) => k.user.username === message.author.username 
        ).size !== 0) && r.name.includes("Cape"));
        
        if (msg[0] === PREFIX){
            (!jsonMap.has(sSon[0]))? seasonOptions(message, jsonMap, rol) : seasontravels(sSon, message, jsonMap, rol);
        }
    }
});

client.login(TOKEN);