const async = require('async');
const util = require('util');
const {Client, GatewayIntentBits} = require('discord.js');

const fs = require('fs');

const target_channel_id = "1138104307489714348";
const target_role_id = "1138468318764875917";

const discord_client = new Client({intents: 
    [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});
if (!fs.existsSync("./app_settings.json", "utf8")) {
    const default_app_settings_structure = {
        "discord_token": "",
        "target_role_id":"",
        "target_channel_id":""
    };
    fs.writeFileSync("./app_settings.json", JSON.stringify(default_app_settings_structure));
    console.log("need to edit app_settings.json and add the token.");
    return;
}
const app_settings = JSON.parse(fs.readFileSync("./app_settings.json", "utf8"));

discord_client.on('ready', async () => {
    console.log(`Logged in as ${discord_client.user.tag}!`);
});

discord_client.on('messageCreate', async (msg) => {
    
    if (msg.author.bot || msg.channel.id != target_channel_id) {
        return;
    }
    if (!msg.content.includes('https://vrchat.com/home/user/usr_')) {
        return;
    }
    if (msg.member.roles.cache.has(app_settings.target_role_id)) {
        msg.member.roles.remove(app_settings.target_role_id);
        console.log(`[${msg.createdAt.toLocaleString()}] User's role update: ${msg.author.globalName}`);
    }
});

discord_client.login(app_settings.discord_token);