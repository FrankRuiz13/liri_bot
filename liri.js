require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

//node liri.js concert-this gomez
var arg1 = process.argv[2];
var arg2 = process.argv[3];

start(arg1, arg2);

function start(arg1, arg2){
    switch(arg1){
        case "concert-this": getMyBands(arg2);
        break;
        case "spotify-this-song": getMeSpotify(arg2);
        break;
        case "movie-this" : getMovie(arg2);
        break;
        case "do-what-it-says" : doWhatItSays();
        break;
        default: console.log("I don't know what your talking about");
    }
}
function getMeSpotify(songName){
    if(songName === undefined){
        songName = "The Sign";
    }
    spotify.search({type:"track", query: songName,limit: 5},function(err, data){
        if(err){
            console.log("ERR occurred: " +err);
            return;
        }
        //console.log(data.tracks);
        var songs = data.tracks.items;
        for(var i=0; i<songs.length; i++){
            console.log("----------------");
            console.log("artist's: " +JSON.stringify(songs[i].artists[0].name));
            console.log("song name: " +songs[i].name);
            console.log("preview song: "+songs[i].preview_url);
            console.log("album: " +songs[i].album.name);
        }
    })
}