const msg = require('./msg.js');
const { ARTs_TITLE } = require('../dates/text.js');
module.exports = {
    async run(path, TRAVELER, initr) {
        const embed = msg.run(ARTs_TITLE(path), 
                                initr, 
                                undefined,
                                undefined, 
                                undefined, 
                                image = TRAVELER.File[0],
                                );

        await initr.reply({embeds: [embed]});
    }
}