const { ActivityType } = require('discord.js');
const Discord = require('discord.js');
const db = require('quick.db');
const config = require("./config.json")
const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds
    ]
});

module.exports = client

client.on('interactionCreate', (interaction) => {
    if (interaction.type !== Discord.InteractionType.ApplicationCommand) return;

    const command = client.slashCommands.get(interaction.commandName);
    if (!command) return interaction.reply({ content: 'erro ao processar o comando' });

    if (command.ownerOnly) {
        if (interaction.user.id !== client.config.ownerID) {
            return interaction.reply({ content: "Este comando é apenas para `CEO/DEVELOPER` do bot!", ephemeral: true });
        }
    }

    const args = [];

    for (let option of interaction.options.data) {
        if (option.type === 'SUB_COMMAND') {
            if (option.name) args.push(option.name);
            option.options?.forEach(x => {
                if (x.value) args.push(x.value);
            });
        } else if (option.value) args.push(option.value);
    }

    try {
        command.run(client, interaction, args)
    } catch (e) {
        interaction.reply({ content: e.message });
    }
});

client.on('ready', () => {
    console.log(`Bot ${client.user.username} Conectado com sucesso!`)
    console.log(`Servidores: ${client.guilds.cache.size}`)
    console.log(`Desenvolvido por: @Yuuri_fonseca`)
    console.log(`https://github.com/YuriFonseca`)

    client.user.setActivity({
        name: 'Piroca Dos Caribe',
        type: ActivityType.Playing
    });
});

client.slashCommands = new Discord.Collection()
require('./handler')(client)

client.login(config.token)