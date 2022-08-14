const { EmbedBuilder } = require('discord.js');
require('../dates/text.js');
/*
function rolHexColor(initr){
    const roles = initr.guild.roles.cache;
    const rol = roles.find(r => (roles.get(r.id).members.filter(
            (k) => k.user.username === initr.user.username 
        ).size !== 0) && r.name.includes("Cape")
    );
    
    return (rol !== undefined)? rol.hexColor: DEFAULTCOLOR;
}
*/

function fieldsData(DATA, FIELDPROGTITLE, FIELDPROGCOMMENT){
    return DATA.reduce(
        (x,y,z) => (z < 13)? x.concat(
            {
                name: FIELDPROGTITLE(y), 
                value: FIELDPROGCOMMENT(y),
            }
        ) : x 
    , []).concat({
        name: 'More info:', 
        value: 'https://sky-children-of-the-light.fandom.com/wiki/Seasonal_Events'
    });
}

module.exports = {
    run: (title, 
            initr, 
            FIELDPROGTITLE=undefined, 
            FIELDPROGCOMMENT=undefined, 
            DATA = undefined, 
            image = undefined, 
            TYPE = 0) => {
        
        /*
        const fields = (!!DATA && TYPE === 0)? fieldsData(DATA, FIELDPROGTITLE, FIELDPROGCOMMENT) : 
                        ((TYPE === 1)? { name: "", file: "" }: []);
        */

        const fields = (!!DATA && TYPE === 0)? fieldsData(DATA, FIELDPROGTITLE, FIELDPROGCOMMENT) : 
                        ((TYPE === 1)? [{ name: FIELDPROGTITLE(), value: FIELDPROGCOMMENT() }]: []);
        
        const embed = new EmbedBuilder()        
        .setTitle(title)
        .setAuthor({ name: initr.user.username, iconURL: initr.user.displayAvatarURL()})
        .setColor('#ffc133')
        .setImage(image)
        .addFields(fields);

        return embed;
    }
}