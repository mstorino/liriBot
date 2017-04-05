// Run 'npm install request' in this directory
//Incorporate the "request" npm package for OMDB 

var request = require ("request");

//Incorporate the "request" npm package for twitter

var spotify = require ("spotify");
//Incorporate the "request" npm package for spotify

//Incorporate core node package for reading & writing files

var fs = require ("fs");



// Grab function command 
var userCommand = process.argv[2];

//Global variables for movieThis
// var movieName;
// var queryURL;

var userValue = process.argv[3];

if (userCommand === "movie-this") {
	movieThis();
} else if (userCommand === "spotify-this-song") {
	spotifyThis();
} else if (userCommand === "my-tweets") {
	tweetThis();
} else {
	doWhat();
}


//tweetThis function

function tweetThis(){
	console.log("tweet this yo.");
	var key = require ("./keys.js");

	var consumerKey = key.twitterKeys.consumer_key;
	var consumerSecret = key.twitterKeys.consumer_secret;
	var accessKey = key.twitterKeys.access_token_key;
	var accessSecret = key.twitterKeys.access_token_secret;
	
	var Twitter = require('twitter');
	var client = new Twitter({
	  consumer_key: consumerKey,
	  consumer_secret: consumerSecret,
	  access_token_key: accessKey,
	  access_token_secret: accessSecret
	});


	var params = {screen_name: 'MaggieStorino'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    for (var i = 0; i <= 2; i++) {
	    	var tweet = tweets[i].text;
	    	console.log(tweet);
	    }
	  }
	});




};

// doWhat function

	function doWhat() {
		

		//store contents of random.txt inside variable data

		fs.readFile ("random.txt", "utf8", function (error, data){
			if (error) {
			return console.log(err);
			} else {
				var output = data.split(",");
				userValue = output[1];
				spotifyThis();
			} 
		}) 

	}


//spotify function

function spotifyThis (){
	

	var spotify = require('spotify');

	spotify.search({ type: 'track', query: userValue}, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }

	    // if (userValue = undefined) { userValue = "I saw the sign"};
	 	
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
	// movieName = process.argv[3];

	//Run Request to OMDB API
	var queryURL = "http://www.omdbapi.com/?t=" + userValue + "&y=&plot=short&r=json";

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