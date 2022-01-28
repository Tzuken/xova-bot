const Discord = require('discord.js')

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

const Help = require('./command/help')

client.once('ready', () =>{
    console.log('Ready !')
});


bot.on('message', function (message) {
 
    if (Help.match(message)) {
        Help.action(message)
    }

})

client.login(process.env.token);