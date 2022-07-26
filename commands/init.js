
const {SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder} = require('@discordjs/builders');
const { RequestInteraction } = require('../dates/Request.js');
const { help, seasonOptions, travelers } = require('../usr/functions.js');
output = require('../dates/output.json');

module.exports = {
    data: output,
    async run(interaction){
        const requests = new RequestInteraction(interaction); 

        if(requests.getSubCommand() === HELP)
            return help(interaction);
        else if(requests.getSubCommand() === SEASONS)
            return seasonOptions(interaction);
        else if (!!requests.getGroup() && !!requests.getSubCommand())
            return travelers(requests.getlisDir(), interaction);
          
    },
};

