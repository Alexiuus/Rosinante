const { MessageEmbed } = require('discord.js');
const { DataResponde } = require('./DataResponde.js');

///////////////////////////// CONSTANTS /////////////////////////////
const GIF_HELP = "img/tenor.gif";
const COMMENT = ":one: If you use \`rs!\` Rosinante will respond with \`The Seasons Of \
Sky\`. \n\n :two: If you use \`rs! <season>\` (<season> is the season you want to watch) Rosinante \
will respond with \`the travelers of the chosen season.\` \n\n :three: If you use \`rs! \
<season>/<traveler>\` (<traveler> is the traveler you want to watch) Rosinante will \
respond with your accessories. \n\n :four: If you use \`rs! <season>/<traveler>/<accessory>\` \
(<accessory> is the accessory you want to watch) Rosinante will respond with her photos.";

///////////////////////////// FUNCTIONS /////////////////////////////
function rolHexColor(message){
    const roles = message.guild.roles.cache;
    const rol = roles.find(r => (roles.get(r.id).members.filter(
            (k) => k.user.username === message.author.username 
        ).size !== 0) && r.name.includes("Cape")
    );
    
    return (rol !== undefined)? rol.hexColor: "#000000";
}

function seasonOptions(datesSeasons, message){
    const hexColor = rolHexColor(message);
    const embed = new MessageEmbed().setTitle("☆｡Sky Seasons｡☆")
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setColor(hexColor);
    
    datesSeasons.getDates().forEach(
        (season, pos) => embed.addField(`:sparkles: ${pos}-${season.Name}`, 
                                        `:stars:\`Travellers: ${season.Travelers.length}\``, true)
    );
    
    message.channel.send({ embeds: [embed] });
}
function accFiles(acc, message, title){
    const hexColor = rolHexColor(message);
    const embed = new MessageEmbed().setTitle(`${title}: ${acc.Name}`)
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setColor(hexColor)
    .addField("Value", acc.precio)
    .setImage('attachment://' + acc.file);

    const msg = { embeds: [embed], files: ["./" + acc.file] };

    message.channel.send(msg);
}

function travelsArts(datesTravels, message, season){
    const req = datesTravels.getRequest();
    const datesArts = new DataResponde(message, datesTravels.getPos(req[1]).Arts);
    const travel = datesTravels.getPos(req[1]).Name;

    if(req.length >= 3 && datesArts.getPathValid(req[2])){  
        accFiles(datesArts.getPos(req[2]), message, `:sparkles: ${season}-:stars:${travel}`);
    }else{
        const hexColor = rolHexColor(message);
        const embed = new MessageEmbed().setTitle(`:sparkles: ${season}: :stars:${travel}`)
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setColor(hexColor) 
        .addField(`:stars:${travel}`, `\`\`\`\n${datesArts.getDates().reduce(
            (prev, curr, ind) => {
                return prev + `${ind}-` + curr.Name + "\n";
            }, "")}\`\`\``
        );

        message.channel.send({ embeds: [embed] });
    }

}

function seasontravels(datesSeasons, message){    
    const req = datesSeasons.getRequest();
    const datesTravels = new DataResponde(message, datesSeasons.getPos(req[0]).Travelers);
    const season = datesSeasons.getPos(req[0]).Name;
    if(req.length >= 2 && datesTravels.getPathValid(req[1])){
        travelsArts(datesTravels, message, season);
    }else{
        const hexColor = rolHexColor(message);
        const embed = new MessageEmbed().setTitle(`:sparkles: ${season}`)
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setColor(hexColor);
        
        datesTravels.getDates().forEach(
            (traveler, pos) => embed.addField(`:stars:${pos}-${traveler.Name}`, `:coin:: (${traveler.totalValue})`)
        )
        message.channel.send({ embeds: [embed] });
    }
}

function help(message){
    const embed = new MessageEmbed().setTitle(`:white_check_mark: Rosinante Guide :blush:`)
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setColor(rolHexColor(message))
    .addField("How to use Rosinante:grey_question:", COMMENT)
    .setImage('attachment://' + GIF_HELP);
    
    message.channel.send({ embeds: [embed], files: [`./${GIF_HELP}`] });
}

module.exports = {
    help,
    seasontravels,
    seasonOptions
}