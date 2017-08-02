const discord = require('discord.js');
const bot = new discord.Client();
const ytdl = require('ytdl-core');
const youtube_manager = require('youtube-node');
const youtube = new youtube_manager();
const broadcast = bot.createVoiceBroadcast();

youtube.setKey('AIzaSyCyGYGrHHq6_s9NLeHW65OKYidK1WpL50c');

bot.on('message', msg => {
    if (msg.content.startsWith('!p ')) {
        let video_name = msg.content.split(' ').slice(1).join(' ');
        youtube.search(video_name, 1, (error, result) => {
            if (error) {
                console.log(error);
                return;
            }

            let song_id = result.items[0].id.videoId;
            playMusic(song_id, msg);
        });
    }

    if (msg.content == '!pause') {
        broadcast.pause();
    }

    if (msg.content == '!resume') {
        broadcast.resume();
    } 
});

function playMusic(song, msg){
    let voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel)
        return;

    broadcast.destroy();

    voiceChannel.join()
    .then(connection => {
        let stream = ytdl('https://youtube.com/watch?v=' + song, { filter: 'audioonly' });

        broadcast.playStream(stream);
        if (!connection.distpacher)
            connection.playBroadcast(broadcast);
    })
    .catch(console.log);
}



bot.login("MzM5MTc2MjQwODUyMjM4MzM2.DFgKBg.2BVXjjIfj1wPBANsJ75IKCDV-E8");
