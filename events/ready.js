module.exports = async (client) => {
    client.user.setActivity(`+help`, { type: 'WATCHING' });
    client.user.setPresence({ status: 'dnd' });

    console.clear();
    console.log(`╭──────────────────────────╮\n├ Connecté sur : ${client.user.username}\n├ Robot : fonctionnel : ✅\n╰──────────────────────────╯`);
};