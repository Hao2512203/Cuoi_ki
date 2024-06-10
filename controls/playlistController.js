const Playlist = require('../models/Playlist'); // Ensure the correct model is imported
const axios = require('axios');

const YTB_API_KEY = "AIzaSyD3TULNHxwjEGhuWEWFDyafVfzZorLI734";
const YTB_API_URL = "https://www.googleapis.com/youtube/v3";

exports.createPlaylist = async (req, res) => {

    try {
        const user = req.session.user
        const { name, playlistId } = req.body;
        const response = await axios.get(`${YTB_API_URL}/playlistItems`, {
            params: {
                part: 'snippet',
                maxResults: 20,
                playlistId: playlistId,
                key: YTB_API_KEY
            }
        });

        const videos = response.data.items.map(item => ({
            videoId: item.snippet.resourceId.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails && item.snippet.thumbnails.default ? item.snippet.thumbnails.default.url : ''
        }));

        const newPlaylist = new Playlist({
            name,
            playlistId,
            videos,
            user: user
        });

        await newPlaylist.save();
        res.redirect('/playlist');
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
        console.log(error);
    }
};
// exports.getPlaylists = async (req, res) => {
//     try {
//         const user = req.session.user
//         const playlists = await Playlist.find({user: user}, (err,res) =>{
//             if(err) console.log(err)
            
//             console.log(res)
//         })
//         res.render('playlist', { playlists: playlists });
//     } catch (error) {
//         res.status(500).json({ message: 'Something went wrong' });
//         console.log(error);
//     }
// };
exports.deletePlaylist = async (req, res) => {
    try {
        const { playlistId } = req.body;
        await Playlist.findOneAndDelete({ _id: playlistId });
        res.redirect('/playlist');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
exports.getPlaylistsDetails = async (req, res) => {
    try {
        const {id} = req.params;
        const playlist = await Playlist.findById(id);
        if(!playlist){
            return res.status(404).send("Playlist not found");
        }
        res.render('playlistDetails', { playlist });
    }catch(err){
        console.log(err)
    }
}
