const msg = require('./msg.js');

require('../dates/text.js');


module.exports = {
    run: (initr) =>{
        const embed = msg.run(HELP_TITLE,
                                initr, 
                                () => HELP_TITLE_FIELD,
                                () => HELP_COMMENT,
                                undefined,
                                HELP_IMAGE,
                                TYPE = 1);

        return initr.reply({ embeds: [embed], files: [`./${GIF_HELP}`] });    
    }
}