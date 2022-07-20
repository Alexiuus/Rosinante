const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, token } = require('./dates/config.json');
const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationCommands(clientId), { body: [] })
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
			Routes.applicationCommands(clientId), { body: commands }
		);
		console.log("Finalizado correctamente");

	}catch (e){
		console.log(e);
	}
}
createSlash();