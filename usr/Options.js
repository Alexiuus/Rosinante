const Sky = require('../dates/SkySeasons.json');
const msg = require('./msg.js');
require('../dates/text.js');


module.exports = {
    run: (intr) => {
        const embed = msg.run(SEASONOP_TITLE, 
                                intr, 
                                (x,y) => SEASONOP_TITLE_FIELD(x,y), 
                                x => SEASONOP_COMMENT(x), 
                                Sky);
        return intr.reply({ embeds: [embed] });
    }
}