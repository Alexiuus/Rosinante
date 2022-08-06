const { MessageEmbed } = require('discord.js');
require('../dates/text.js');

function rolHexColor(initr){
    const roles = initr.guild.roles.cache;
    const rol = roles.find(r => (roles.get(r.id).members.filter(
            (k) => k.user.username === initr.user.username 
        ).size !== 0) && r.name.includes("Cape")
    );
    
    return (rol !== undefined)? rol.hexColor: DEFAULTCOLOR;
}

module.exports = {
    run: (title, 
            initr, 
            FIELDPROGTITLE=undefined, 
            FIELDPROGCOMMENT=undefined, 
            DATA = undefined, 
            image = undefined, 
            TYPE = 0) => {
        
        const embed = new MessageEmbed()
        .setTitle(title)
        .setAuthor(initr.user.username, initr.user.displayAvatarURL())
        .setColor(rolHexColor(initr));
        if (!!DATA && TYPE === 0) 
            DATA.forEach(
                (x, y) => embed.addField(FIELDPROGTITLE(y, x), FIELDPROGCOMMENT(x), true)
            );
        else if (TYPE === 1)
            embed.addField(FIELDPROGTITLE(), FIELDPROGCOMMENT());

        if(!!image) embed.setImage(image);

        return embed;
    }
}