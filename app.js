const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");

const app = express();


var keyword;
var result = [];

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
 
app.get("/",function(req, res){
	res.render("search");
});

app.get("/search",function(req, res){
	res.render("photos",{key: keyword , imgURL: result});
});

/*app.get("/search/quality",function(req, res){
	res.render("qualityPhotos",{key: keyword , imgURL: finalResult});
});
*/

app.post("/",function(req, res){
	console.log(req.body.keywords);
	keyword = req.body.keywords;
	var baseURL = "https://unsplash.com/napi/search?query=";
	var optional = "&xp=&per_page=20";
	var finalURL = baseURL + keyword + optional;
	console.log(finalURL);
	
	request(finalURL,function(error, response, body){
		if(error){
			console.log(error);
			return;
		}
		var data = JSON.parse(body);
		var images = data.photos.results;
		var i;
		result = []; 
		
		for (i in images) {
			result.push(images[i].urls.thumb);
		}
		console.log(result);
		res.redirect("/search");
	});
});

app.listen(process.env.PORT || 3000, function(){
	console.log("Server is running on port 3000.");
});


