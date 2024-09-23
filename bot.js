//https://discord.com/oauth2/authorize?client_id=1209899094026490048&scope=bot&permissions=964220545216
import {Client, EmbedBuilder, GatewayIntentBits} from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();
var supported = ['amazonMusic', 'anghami', 'boomplay', 'deezer', 'appleMusic', 'pandora', 'soundcloud', 'tidal', 'youtube', 'youtubeMusic', 'spotify', 'napster'];
var display = ['Amazon Music', 'Anghami', 'Boomplay', 'Deezer', 'Apple Music', 'Pandora', 'Soundcloud', 'Tidal', 'Youtube', 'Youtube Music', 'Spotify', 'Napster'];
var emojiIDs = [
  '1209909307835940896',
  '1209909282460532766',
  '1209909253868093541',
  '1209909671066996786',
  '1209909199023120434',
  '1209909942350250004',
  '1209910112513167360',
  '1209910205115011082',
  '1209910464344227892',
  '1209910508648665158',
  '1209909228278382592',
  '1209925589285208134',
]; //Only for the official bot

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'song') {
    await interaction.reply('Pong!');
  }
});

// Check every message for a URL
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  //check if the message contains a link
  const linkRegex = /https?:\/\/[^\s]+/g;
  const links = message.content.match(linkRegex);
  if (!links) return;
  var messagesSent = 0;

  //check if the link is a song link
  for (const link of links) {
    try {
      if (messagesSent >= 3) return;
      const platform = identifySongLink(link);
      if (!platform) continue;
      var songData = await fetchSongLink(link);
      if (!songData) continue;
      var entities = songData.entitiesByUniqueId[Object.keys(songData.entitiesByUniqueId)[0]];
      var fields = [];
      Object.keys(songData.linksByPlatform).forEach(function (key) {
        if (supported.includes(key)) {
          if (process.env.CLIENT_ID == '1209899094026490048') {
            fields.push({
              name: `<:${key}:${emojiIDs[supported.indexOf(key)]}>`,
              value: `**[${display[supported.indexOf(key)]}](${songData.linksByPlatform[key].url})**\n\n`,
              inline: true,
            });
          } else {
            fields.push({
              name: '\u200B',
              value: `**[${display[supported.indexOf(key)]}](${songData.linksByPlatform[key].url})**\n\n`,
              inline: true,
            });
          }
        }
      });
      //make fields a multiple of 3
      while (fields.length % 3 != 0) {
        fields.push({name: '\u200B', value: '\u200B', inline: true});
      }
      if (!songData) continue;
      const songEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(entities.title + ' - ' + entities.artistName)
        .setURL(songData.pageUrl || link)
        .setAuthor({name: entities.artistName})
        .addFields(fields)
        .setImage(entities.thumbnailUrl)
        .setFooter({text: 'Powered by Songlink/Odesli', iconURL: 'https://odesli.co/favicon.ico?v=5'})
        .setTimestamp();

      console.log(entities.title + ' - ' + entities.artistName);
      message.reply({embeds: [songEmbed]});
      messagesSent++;
    } catch (error) {
      console.log(error);
      continue;
    }
  }
});

async function fetchSongLink(songURL) {
  const url = `https://api.song.link/v1-alpha.1/links?url=${encodeURIComponent(songURL)}&songIfSingle=true`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    if (!response.ok) {
      return null;
    }
  } catch (error) {
    console.error('An error occurred:', error);
    return null;
  }
}
function identifySongLink(link) {
  const regexes = {
    amazonMusic: /music\.amazon\.com/,
    anghami: /play\.anghami\.com/,
    boomplay: /www\.boomplay\.com/,
    deezer: /www\.deezer\.com/,
    appleMusic: /music\.apple\.com/,
    pandora: /www\.pandora\.com/,
    soundcloud: /soundcloud\.com/,
    tidal: /listen\.tidal\.com/,
    youtube: /www\.youtube\.com/,
    youtubeMusic: /music\.youtube\.com/,
    spotify: /open\.spotify\.com/,
  };

  for (const [key, regex] of Object.entries(regexes)) {
    if (regex.test(link)) {
      return key;
    }
  }

  return false;
}

client.login(process.env.TOKEN);
