const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req, res){
	res.sendFile(__dirname + "/testPhoto.html");
	console.log(req.originalUrl);
	invokeAPI(req, res);
	//res.send(result);
});

app.get("/search",function(req, res){
	//res.sendFile(__dirname + "/test.html");
	console.log(req.originalUrl);
	invokeAPI(req, res);
	//res.send(result);
});

function invokeAPI(req, res){
	console.log(req.body.keywords);
	var keyword = req.param('keywords');
	var limit = req.param('limit');
	var baseURL = "https://unsplash.com/napi/search?query=";
	var optional = "&xp=&per_page=";
	var finalURL = baseURL + keyword + optional + limit;
	console.log(finalURL);
	
	request(finalURL,function(error, response, body){
		if(error){
			console.log(error);
			return;
		}
		var result = [];
		//request("https://unsplash.com/napi/search?query=cat&xp=&per_page=2",function(error, response, body){
		//console.log(response);
		//console.log(response.statusCode);
		//console.log(body);
		var data = JSON.parse(body);
		var images = data.photos.results;
		var i;
		for (i in images) {
			result.push(images[i].urls);
			//res.write(result[i]);
			//var img = req.get('result[i]');
			//res.write(img + "  ")
		}

		console.log(result);
		res.write(JSON.stringify(result));
		res.send();
		
	});
} 


app.listen(3000, function(){
	console.log("Server is running on port 3000.");
});