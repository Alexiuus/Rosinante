const Sky = require('../dates/SkySeasons.json');
const rand = require('../dates/rand.json');
const msg = require('./msg.js');

const { SEASONOP_TITLE, SEASONOP_TITLE_FIELD, SEASONOP_COMMENT } = require('../dates/text.js');

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


module.exports = {
    run: (intr) => {
        img = rand[getRandomInt(rand.length)].File;
        const embed = msg.run(SEASONOP_TITLE, 
                                intr, 
                                x => SEASONOP_TITLE_FIELD(x), 
                                x => SEASONOP_COMMENT(x), 
                                Sky,
                                img);

        return intr.reply({ embeds: [embed] });
    }
}