const Discord = require('discord.js')

const Command = requiere('./command/command')
const Help = requiere('./command/help')


bot.on('message', message => {
    
    Help.parse(message)

})




const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

client.once('ready', () =>{
    console.log('Ready !')
});

client.login(process.env.token);