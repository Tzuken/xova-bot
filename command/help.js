const Discord = require('discord.js')
const Command = require('./command')

module.exports = class Ping extends Command {

        static match(message) {
            if(message.content === '+help') {
                return true
            }
        }
        
    
    static action(message) {

        let help = new Discord.RichEmbed()
            .setTitle ('')
            .setDescription ('')
            .setColor('')
            .setFooter('')

    message.channel.send(help)
    } 
    
}