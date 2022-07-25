const { MessageEmbed } = require('discord.js');
const json = require('../dates/SkySeasons.json');

require('../dates/text.js');


function rolHexColor(interaction){
    const roles = interaction.guild.roles.cache;
    const rol = roles.find(r => (roles.get(r.id).members.filter(
            (k) => k.user.username === interaction.user.username 
        ).size !== 0) && r.name.includes("Cape")
    );
    
    return (rol !== undefined)? rol.hexColor: DEFAULTCOLOR;
}

function help(interaction){
    const embed = new MessageEmbed()
    .setTitle(HELP_TITLE)
    .setAuthor(interaction.user.username, interaction.user.displayAvatarURL())
    .setColor(rolHexColor(interaction))
    .addField(HELP_TITLE_FIELD, HELP_COMMENT)
    .setImage(HELP_IMAGE);
    
    return interaction.reply({ embeds: [embed], files: [`./${GIF_HELP}`] });
}

function seasonOptions(interaction){
    const embed = new MessageEmbed()
    .setTitle(SEASONOP_TITLE)
    .setAuthor(interaction.user.username, interaction.user.displayAvatarURL())
    .setColor(rolHexColor(interaction));
    
    json.forEach(
        (season, pos) => embed.addField(SEASONOP_TITLE_FIELD(pos, season.Name),
                                        SEASONOP_COMMENT(season.Travelers.length), true)
    );
    
    return interaction.reply({ embeds: [embed] });
}

function art(request, articulesDates, interaction){
    if (!articulesDates.find(articule => articule.Name === request[2])) 
        return articules(request.pop(), interaction);

    const ARTICULE = articulesDates.find(articule => articule.Name === request[2]);

    const embed = new MessageEmbed().setTitle(ART_TITLE(request, ARTICULE.Name))
    .setAuthor(interaction.user.username, interaction.user.displayAvatarURL())
    .setColor(rolHexColor(interaction))
    .addField("Value", ARTICULE.Value)
    .setImage(ART_IMAGE);

    const msg = { embeds: [embed], files: ["./" + ARTICULE.File] };
    return interaction.reply(msg);
}


function articules(request, travelersDates, interaction){
    if (!travelersDates.find(traveler => traveler.Name === request[1])) 
        return travelers(request[0], interaction);
    
    const ARTICULES = travelersDates.find(traveler => traveler.Name === request[1]).Arts;

    if(request.length == 3){
        
        return art(request, ARTICULES, interaction);
    }else{
        const embed = new MessageEmbed().setTitle(ARTs_TITLE(request))
        .setAuthor(interaction.user.username, interaction.user.displayAvatarURL())
        .setColor(rolHexColor(interaction)) 
        .addField(ARTs_TITLE_FIELD(request[1]), ARTs_COMMENT(ARTICULES));
        
        return interaction.reply({ embeds: [embed] });
    }
}

function travelers(destiny, interaction){    
    const REQ = destiny.split("/");
    if (!json.find(season => season.Name === REQ[0])) return seasonOptions(interaction);

    const TRAVELERS = json.find(traveler => traveler.Name === REQ[0]).Travelers;
    
    if(REQ.length >= 2){
        return articules(REQ, TRAVELERS, interaction);
    } else {
        const embed = new MessageEmbed().setTitle(TRAVs_TITLE(REQ[0]))
        .setAuthor(interaction.user.username, interaction.user.displayAvatarURL())
        .setColor(rolHexColor(interaction));

        TRAVELERS.forEach(
            (traveler, pos) => embed.addField(TRAVs_TITLE_FIELD(pos, traveler.Name), 
                                            TRAVs_COMMAND(traveler.totalValue))
        );
        return interaction.reply({ embeds: [embed] });
    }
}

module.exports = {
    help,
    seasonOptions,
    travelers
}