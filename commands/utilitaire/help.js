//commande help
const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Commande aide',
    exemple: `**+help**`,
    usage: '<aucun>',
    guildOnly: true,
    cooldown: 5,
    async execute(client, message, args) {
        message.delete();

        message.channel.send(`${message.author.username}, voici toute les commandes disponible avec le bot !`)
    }
}