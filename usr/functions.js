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
    const TRAVELER = travelersDates.find(traveler => traveler.Name.toLowerCase() === request[1])
    const ARTICULES = TRAVELER.Arts;
    
    if(request.length === 3 && request[2] !== null && 
        !!ARTICULES.find(articule => articule.Name === request[2])){    
        return art(request, ARTICULES, interaction);
    }else{
        const embed = new MessageEmbed().setTitle(ARTs_TITLE(request))
        .setAuthor(interaction.user.username, interaction.user.displayAvatarURL())
        .setColor(rolHexColor(interaction)) 
        .addField(TRAVs_COMMAND(TRAVELER.totalValue), ARTs_COMMENT(ARTICULES));
        
        return interaction.reply({ embeds: [embed] });
    }
}

function travelers(destiny, interaction){   
    if (!json.find(season => season.Name.toLowerCase() === destiny[0])) return seasonOptions(interaction);

    const TRAVELERS = json.find(traveler => traveler.Name.toLowerCase() === destiny[0]).Travelers;
    if(destiny.length >= 2 && destiny[1] !== null &&
        !!TRAVELERS.find(traveler => traveler.Name.toLowerCase() === destiny[1])){ 
        
        return articules(destiny, TRAVELERS, interaction);
    } else {
        const embed = new MessageEmbed().setTitle(TRAVs_TITLE(destiny[0]))
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