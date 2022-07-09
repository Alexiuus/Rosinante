const { Client, Intents, MessageEmbed, MessageAttachment } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });


///////////////////////////// CONSTANTS /////////////////////////////
const TOKEN = "ODM2MDg4Mzg0Mzc1NjE5NTg0.G2rByX.jGvIwcFVH8idPHNrJ-Z0LgR06VLZAkZuo2wUlI";
const PREFIX = "img";
const json = require('./SkySeasons.json');


///////////////////////////// FUNCTIONS /////////////////////////////
function seasonOptions(message, jsonMap, HexColor){
    
    const embed = new MessageEmbed().setTitle("Temporadas de SKY")
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setColor(HexColor);

    jsonMap.forEach(
        (sky, val) => embed.addField(val, Object.entries(sky).reduce(
            (prev, curr) =>{
                return prev + curr[0] + " " + curr[1].precio + "\n";
            }, "")
        )
    );

    message.channel.send({ embeds: [embed] });
}
function accFiles(sky, message, acc, HexColor){

    const embed = new MessageEmbed().setTitle(sky[0] + "-" + sky[1] + ": " + sky[2])
    .setColor(HexColor)
    .addField("precio", acc.precio)
    .setImage('attachment://' + acc.file);;

    const msg = { embeds: [embed], files: ['./' + acc.file] };

    message.channel.send(msg);
}

function travelsAccess(sky, message, access, HexColor){

    const accMap = new Map(Object.entries(access));
    const embed = new MessageEmbed().setTitle(sky[0] + ": " + sky[1])
    .setColor(HexColor);

    if(sky.length <= 2 || !accMap.has(sky[2])){
        accMap.forEach(
            (values, accesorio) => {
                if (accesorio !== "precio")
                    embed.addField(accesorio, values.precio);
            }  
        );
    
        message.channel.send({ embeds: [embed] });
    }else{
        accFiles(sky, message, accMap.get(sky[2]), HexColor);
    }

}

function seasontravels(sky, message, jsonMap, HexColor){

    const travelMap = new Map(Object.entries(jsonMap.get(sky[0])));
    const embed = new MessageEmbed().setTitle(sky[0])
    .setColor(HexColor);

    if (sky.length <= 1 || !travelMap.has(sky[1])){
        travelMap.forEach(
            (values, viajero) => embed.addField(viajero, Object.entries(values).reduce(
                (prev, curr) =>{
                    const p = (curr[0] !== "precioTotal")? curr[1].precio : curr[1];               
                    return prev + curr[0] + ": " + p + "\n";
                }, "")
            )
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
    
    return rol.hexColor;
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
        
        if (msg[0] === PREFIX){
            (!jsonMap.has(sSon[0]))? seasonOptions(message, jsonMap, HexColor) : seasontravels(sSon, message, jsonMap, HexColor);
        }
    }
});

client.login(TOKEN);