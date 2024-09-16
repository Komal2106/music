
/*****************************************************************************
*  SEP420  – Assignment 2
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: ___Mankomal Kaur Gandhara___ Student ID: __134553221__ Date: _July 21, 2024_
*
*****************************************************************************/ 


const Music = [
    {
        title : "That Girl",
        artist: "Amrinder Gill",
        artist_image: "https://hamariweb.com/profiles/images/profile/3956-554-6922.jpg"
    },
    {
        title : "Ocean Eyes",
        artist: "Amrinder Gill",
        artist_image: "https://hamariweb.com/profiles/images/profile/3956-554-6922.jpg"
    },
    {
        title : "On Top",
        artist: "Karan Aujla",
        artist_image: "https://i.pinimg.com/564x/a3/69/9b/a3699bfe26fcc2346be6b5cda7f51553.jpg"
    },
    {
        title : "Born to Shine",
        artist: "Diljit Dosanjh",
        artist_image: "https://i.pinimg.com/736x/ba/15/b1/ba15b1246843889f478fd123ecd83699.jpg"
    },
    {
        title : "Selfmade",
        artist: "Sidhu Moosewala",
        artist_image: "https://i.pinimg.com/originals/72/79/f8/7279f8857314635e6f8c50e0f60971d0.jpg"
    },
    {
        title : "Grace",
        artist: "Gurnam Bullar",
        artist_image: "https://i.pinimg.com/originals/86/b9/06/86b90615e050fa3fed8d0f843b7e6923.jpg"
    },
]

const PLAYLIST = [
]

const express = require('express');

const app = express();

const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", {music:Music});
});

app.get("/playlist", (req, res) => {
    res.render("playlist.ejs", {playlist: PLAYLIST}  )
})

app.get("/find/:artistName", (req, res) => {
    const artistName = req.params.artistName;
    const song = Music.filter(songs => songs.artist === artistName);
    res.render("find.ejs", {artist: artistName, song});
})

app.get('/add/:position', (req, res) => {
    const position = parseInt(req.params.position);
    if (position >= 0 && position < Music.length) {
        const songtoAdd = Music[position];
        const isAlreadyInPlaylist = PLAYLIST.some(song => song.title === songtoAdd.title);
        
        if (!isAlreadyInPlaylist) {
            PLAYLIST.push(songtoAdd);
            //res.render("playlist.ejs");
             //res.render("Song added to playlist successfully!");
            
            res.render("playlist.ejs", {playlist:PLAYLIST });
            res.send( "Song added to playlist successfully!");
        }else{
            res.send('Song is already present!');
        }
        
    } else {
        res.send('Invalid position!');
    }
});

app.listen(port, ()=> {
    console.log(`Server running on port 3000`);
});