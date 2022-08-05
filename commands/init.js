
const { RequestInteraction } = require('../dates/Request.js');
const { help, seasonOptions, travelers } = require('../usr/functions.js');
output = require('../dates/output.json');
const { HELP, SEASONS } = require('../dates/text.js')
module.exports = {
    data: output,
    async run(interaction){
        const requests = new RequestInteraction(interaction); 
        console.log(interaction.options);
        if(requests.getSubCommand() === HELP)
            return help(interaction);
        else if(requests.getSubCommand() === SEASONS)
            return seasonOptions(interaction);
        else if (!!requests.getGroup() && !!requests.getSubCommand())
            return travelers(requests.getlisDir(), interaction);
          
    },
};

