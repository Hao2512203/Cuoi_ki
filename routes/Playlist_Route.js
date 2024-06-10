const express = require('express')
const playlistController = require('../controls/playlistController')

const router = express.Router()

router.post('/create', playlistController.createPlaylist);
// router.get('/playlist', playlistController.getPlaylists)
router.post('/delete', playlistController.deletePlaylist);
router.get('/:id',playlistController.getPlaylistsDetails)


module.exports = router