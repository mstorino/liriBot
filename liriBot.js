//Incorporate the "request" npm package for OMDB 

	var request = require ("request");

//Incorporate the "spotify" npm package for twitter

	var Twitter = require('twitter');

//Incorporate the "request" npm package for spotify

	var spotify = require ("spotify");
//Incorporate core node package for reading & writing files

	var fs = require ("fs");


// Grab user input from command line

	var userCommand = process.argv[2];

	var userValue = process.argv[3];

// determine what command the user entered and then run the related function

	if (userCommand === "movie-this") {
		movieThis();
	} else if (userCommand === "spotify-this-song") {
		spotifyThis();
	} else if (userCommand === "my-tweets") {
		tweetThis();
	} else {
		doWhat();
	}


//movieThis Function, calls to OMDB API and returns information re: movie

	function movieThis (){

		//Run Request to OMDB API
		var queryURL = "http://www.omdbapi.com/?t=" + userValue + "&y=&plot=short&r=json";

		//Debug against the actual URL
		// console.log(queryURL);

		request(queryURL, function(error, response, body){
			//If the request is successful

			if (error && response.statusCode === 200) {
		        console.log('Error occurred: ' + error);
		        return;
		    } else if (userValue === undefined) {
		    	userValue = "Mr. Nobody";
		    	movieThis();
		    }

		    else{

				//parse the body
				
				console.log("*****************************");
				console.log("");
				console.log ("TITLE: " + JSON.parse(body).Title + ", RELEASE YEAR: "+ JSON.parse(body).Year + ", IMDB RATING: " + JSON.parse(body).imdbRating + ", COUNTRY PRODUCED: " + JSON.parse(body).Country + ", LANGUAGE: " + JSON.parse(body).Language + ", PLOT: " + JSON.parse(body).Plot + " ACTORS: " + JSON.parse(body).Actors);
				console.log("");
				console.log("*****************************");
			} 
		});
	}

//spotify function, calls to spotuft API and returns information re: song

	function spotifyThis (){

		spotify.search({ type: 'track', query: userValue}, function(error, data) {
		    if (error ) {
		        console.log('Error occurred: ' + error);
		        return;
		    } else if (userValue === undefined) {
		    	userValue = "I saw the sign"
		    	spotifyThis();
		    } else {

		    // if (userValue = undefined) { userValue = "I saw the sign"};
		 	
		 	var songInfo = data.tracks.items[0];

		 	console.log("*****************************");
			console.log("");

		 	console.log("Song Title: " + songInfo.name + 
		 		", Preview URL: " + songInfo.preview_url + ", Artist: " +songInfo.artists[0].name + ", Album: " + songInfo.album.name);

			console.log("");
			console.log("*****************************");

			};
		});

	};


//tweetThis function calls to twitter API and should return the last 20 tweets, but in this case it only returns 3 because that's all the tweets that I have.


	function tweetThis(){

		//pull in keys from keys.js file and assign to variable

		var key = require ("./keys.js");
		var consumerKey = key.twitterKeys.consumer_key;
		var consumerSecret = key.twitterKeys.consumer_secret;
		var accessKey = key.twitterKeys.access_token_key;
		var accessSecret = key.twitterKeys.access_token_secret;
		
		// create new twitter client

		var client = new Twitter({
		  consumer_key: consumerKey,
		  consumer_secret: consumerSecret,
		  access_token_key: accessKey,
		  access_token_secret: accessSecret
		});


//BRIAN WHY DOESN'T TWEETS.LENGTH WORK?

		var params = {screen_name: 'MaggieStorino'};

		client.get('statuses/user_timeline', params, function(error, tweets, response) {
			
			if (error) {
				console.log('Error occurred: ' + error);
		    	return; 
		    } else {
		    	// console.log(tweets.length);
		    	// console.log(tweets);
		    	for (var i = 0; i < tweets.length; i++){
		    	var tweet = tweets[i].text;
		    	console.log(tweet);
		   		}
			};

		});
	}

// doWhat function, if the user doesn't enter any parameters then the doWhat function runs the data in the random.txt file through the spotify funciton.

	function doWhat() {
		
		//store contents of random.txt inside variable data

		fs.readFile ("random.txt", "utf8", function (error, data){
			if (error) {
				console.log('Error occurred: ' + error);
	        	return;
			} else {
				var output = data.split(",");
				userValue = output[1];
				spotifyThis();
			} 
		}) 

	}
