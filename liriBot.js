// Run 'npm install request' in this directory
//Incorporate the "request" npm package for OMDB 

var request = require ("request");

//Incorporate the "request" npm package for twitter

var spotify = require ("spotify");
//Incorporate the "request" npm package for spotify



// Grab function command 
var userCommand = process.argv[2];

//Global variables for movieThis
var movieName;
var queryURL;

if (userCommand === "movie-this") {
	movieThis();
};

if (userCommand === "spotify-this-song") {
	spotifyThis();
};

//spotify function

function spotifyThis (){
	

	var spotify = require('spotify');
	var song = process.argv[3];

	spotify.search({ type: 'track', query: song}, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }

	    // if (song = undefined) { song = "I saw the sign"};
	 	
	 	var songInfo = data.tracks.items[0];

	 	console.log("*****************************");
		console.log("");

	 	console.log("Song Title: " + songInfo.name + 
	 		", Preview URL: " + songInfo.preview_url + ", Artist: " +songInfo.artists[0].name + ", Album: " + songInfo.album.name);

		console.log("");
		console.log("*****************************");

	});


};


//movieThis Function, calls to OMDB API and returns information re: movie

function movieThis (){
	//Grab Movie Name
	movieName = process.argv[3];

	//Run Request to OMDB API
	queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json";

	//Debug against the actual URL
	// console.log(queryURL);



	request(queryURL, function(error, response, body){
		//If the request is successful

		if (!error && response.statusCode === 200){
			//parse the body
			
			console.log("*****************************");
			console.log("");
			console.log ("TITLE: " + JSON.parse(body).Title + ", RELEASE YEAR: "+ JSON.parse(body).Year + ", IMDB RATING: " + JSON.parse(body).imdbRating + ", COUNTRY PRODUCED: " + JSON.parse(body).Country + ", LANGUAGE: " + JSON.parse(body).Language + ", PLOT: " + JSON.parse(body).Plot + " ACTORS: " + JSON.parse(body).Actors);
			console.log("");
			console.log("*****************************");
		} 
	});
}