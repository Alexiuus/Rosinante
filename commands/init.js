
const {SlashCommandBuilder} = require('@discordjs/builders');
const { RequestInteraction } = require('../dates/Request.js');
const { help, seasonOptions, travelers } = require('../usr/functions.js');

require('../dates/text.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName(COMMAND)
    .setDescription(DESCRIPTION_COMMAND)
    .addSubcommand(subcommand =>
        subcommand.setName(SEASONS)
        .setDescription(DESCRIPTION_SEASONS)
        .addStringOption(option =>
            option.setName(DESTINY)
            .setDescription(DESCRIPTION_DESTINY)
        )
	)
    .addSubcommand(subcommand =>
        subcommand.setName(HELP)
            .setDescription(DESCRIPTION_HELP)
	),
   
    async run(interaction){
        const requests = new RequestInteraction(interaction); 
        if(requests.getSubCommand() === HELP)
            return help(interaction);
        else if(requests.getSubCommand() === SEASONS)
            if (requests.getHoistedOpName() !== DESTINY)
                return seasonOptions(interaction);
            else
                return travelers(requests.getHoistedOpValue(), interaction);
        else 
            return;
        
    },
};