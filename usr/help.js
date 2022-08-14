const msg = require('./msg.js');

const { HELP_TITLE, HELP_COMMENT, HELP_TITLE_FIELD, GIF_HELP } = require('../dates/text.js');


module.exports = {
    run: (initr) =>{
        const embed = msg.run(HELP_TITLE,
                                initr, 
                                () => HELP_TITLE_FIELD,
                                () => HELP_COMMENT,
                                undefined,
                                GIF_HELP,
                                TYPE = 1);

        return initr.reply({ embeds: [embed]});    
    }
}