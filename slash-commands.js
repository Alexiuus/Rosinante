const fs = require('fs');
require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENTID), { body: [] })
	.then(() => console.log('Successfully deleted all application commands.'))
	.catch(console.error);

async function createSlash(){
	try{
		const commands = [];
        const commandsFile = fs.readdirSync('./commands').filter(r => r.endsWith('.js'));
		
        commandsFile.forEach(
            field => {
                const command = require(`./commands/${field}`);
                console.log(command.data);
                commands.push(command.data.toJSON());
            }
        );
		await rest.put(
			Routes.applicationCommands(process.env.DISCORD_CLIENTID), { body: commands }
		);
		console.log("Finalizado correctamente");

	}catch (e){
		console.log(e);
	}
}
createSlash();