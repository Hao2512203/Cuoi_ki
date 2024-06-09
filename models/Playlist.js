const mongoose = require('mongoose')

const PlaylistSchema = new mongoose.Schema({
    name: String,
    playlistId: String,
    videos:[
        {
            videoId: String,
            title: String,
            description: String,
            thumbnail: String
        }
    ],
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'} 
    // user: String
})

const Playlist = mongoose.model('playlist', PlaylistSchema); // Tạo mô hình từ Schema

module.exports = Playlist;