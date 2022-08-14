
const { RequestInteraction } = require('../dates/Request.js');
const { HELP, SEASONS, HOME } = require('../dates/text.js');
const output = require('../dates/output.json');
const options = require('../usr/Options.js');
const travs = require('../usr/travs.js');
const help = require('../usr/help.js');
const home = require('../usr/home.js');

module.exports = {
    data: output,
    async run(interaction){
        const requests = new RequestInteraction(interaction); 

        if(requests.getSubCommand() === HELP)
            return help.run(interaction);
        else if(requests.getSubCommand() === SEASONS)
            return options.run(interaction);
        else if(!!HOME.find(x => x === requests.getSubCommand()))
            return home.run(interaction, requests.getSubCommand());
        else if (!!requests.getGroup() && !!requests.getSubCommand())
            return travs.run(requests.getlisDir(), interaction);
    }
};

