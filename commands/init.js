
const { RequestInteraction } = require('../dates/Request.js');
const help = require('../usr/help.js');
const options = require('../usr/Options.js');
const travs = require('../usr/travs.js');
output = require('../dates/output.json');
const { HELP, SEASONS } = require('../dates/text.js')

module.exports = {
    data: output,
    async run(interaction){
        const requests = new RequestInteraction(interaction); 
        console.log(interaction.options);
        if(requests.getSubCommand() === HELP)
            return help.run(interaction);
        else if(requests.getSubCommand() === SEASONS)
            return options.run(interaction);
        else if (!!requests.getGroup() && !!requests.getSubCommand())
            return travs.run(requests.getlisDir(), interaction);
    },
};

