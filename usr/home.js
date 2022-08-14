const Sky = require('../dates/SkySeasons.json');
const msg = require('./msg.js');

const { HOME_TITLE } = require('../dates/text.js');

function createEmbed(initr, zone, title){
    return msg.run(
        HOME_TITLE(title, zone),
        initr,
        undefined,
        undefined, 
        undefined, 
        image = zone.File[0]
    );
}

module.exports = {
    run: (intr, SeasoName) => {
        const SEASON = Sky.find(season => season.Name.toLowerCase() === SeasoName); 
        const embeds = SEASON.Files.reduce(
            (prev,curr) => prev.concat(createEmbed(intr, curr, SEASON.Name))
        , []);
        return intr.reply({embeds: embeds});
    }
}