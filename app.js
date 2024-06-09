const connectdb = require('./configs/db')
const express = require('express')
const UserRoute = require('./routes/User_route')
const PlaylistRoute = require('./routes/Playlist_Route')
const bodyParser = require('body-parser');
const Playlist = require('./models/Playlist');
const session = require('express-session')

const app = express()

app.use(session({
    secret: 'key123',
    resave: false,
    saveUninitialized: false
}));

connectdb();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use('/api/playlists', PlaylistRoute);
app.use('/users',UserRoute)

app.get('/', (req,res) => {
    res.render('login')
})


app.get('/login', (req,res) => {
    res.render('login')
})

app.get('/register', (req,res) => {
    res.render('register')
})

app.get('/playlist', async (req, res) => {
    try {
        const user = req.session.user
        const playlists = await Playlist.find({ user: user});
        res.render('playlist', { playlists: playlists});
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(3001 , () => {
    console.log('server running on port 3001')
})