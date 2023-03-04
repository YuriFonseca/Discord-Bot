const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Minha latência',
    type: Discord.ApplicationCommandType.ChatInput,
    
    run: async (client, interaction) => {
        let ping = client.ws.ping
        let embed = new Discord.EmbedBuilder()
        .setDescription(`Estou com o ping ${ping} ms.`)
        .setColor('BLUE')

        interaction.reply({embeds: [embed]})
    }
}