const msg = require('./msg.js');
const fs = require('fs');

module.exports = {
    async run(path, TRAVELER, initr) {
        console.log(TRAVELER.File[0])
        const embed = msg.run(ARTs_TITLE(path), 
                                initr, 
                                undefined,
                                undefined, 
                                undefined, 
                                image = TRAVELER.File[0]);

        await initr.reply({embeds: [embed]});
    }
}