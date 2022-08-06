const msg = require('./msg.js');
const fs = require('fs');
require('../dates/text.js');

module.exports = {
    run: (path, TRAVELER, initr) => {
        const fileTrav = (fs.existsSync('./' + TRAVELER.File[0]))? TRAVELER.File[0] : 'img/error.png';
        const embed = msg.run(ARTs_TITLE(path), initr, image = ART_IMAGE(fileTrav));

        return initr.reply({ embeds: [embed], files: [`./${fileTrav}`] });
    }
}