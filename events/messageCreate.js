
const Discord = require('discord.js');
module.exports = async (client, message) => {

    if (message.author.bot) return;

    const prefix = '+';
    if (!message.content.startsWith(prefix)) return;
    const member = message.guild.members.cache.get(message.author.id);

    // Setting Commands
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    // Setting Arguments
    if (command.args && !args.length) {
        var reply = `\`❌\` <@${message.author.id}>, tu as donné \`0 arguments\`, hors la commande en a besoin.`

        if (command.usage) {
            reply += `\nLe bon usage serait : "\`${prefix}${command.name} ${command.usage}\`".`;
        }

        return message.channel.send({ content: reply });
    }

    // Checking DM's
    if (command.guildOnly && message.channel === 'dm') {
        return message.channel.send({ content: '\`❌\`, je ne peux pas exécuter cette commande dans les `MP\'s`.' });
    }

    // Setting Permissions
    if (member.id !== '709051672617549826' && command.permissions) {
        const authorPerms = message.channel.permissionsFor(message.author);
        if (!authorPerms || !authorPerms.has(command.permissions)) {
            return message.channel.send({ content: `\`❌\` <@${message.author.id}>, tu ne peux pas effectuer cette commande car tu ne possèdes pas la/les permission(s) requises : "\`${command.permissions}\`".` });
        }
    }

    // Setting Cooldowns
    const { cooldowns } = client;

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id) && member.id !== '359647214626275328') {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.channel.send({ content: `\`❌\` <@${message.author.id}>, attendez encore \`${timeLeft.toFixed(1)} seconde(s)\` avant d'utiliser la commande "\`${command.name}\`".` });
        }
    }

    if (member.id !== '359647214626275328') {
        timestamps.set(message.author.id, now);
    }
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    // Running Commands
    try {
        command.execute(client, message, args);
    } catch (error) {
        console.error(error);

        message.reply({ content: `\`❌\` <@${message.author.id}>, une erreur s'est produite lors de l'exécution de la commande "\`${command.name}\`".` });
    }
}