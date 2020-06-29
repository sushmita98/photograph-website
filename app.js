const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const app = express();

const url = 'mongod://localhost:27017';
const dbName = 'photos';
const client = new MongoClient(url);
client.connect(function(err) {
	  assert.equal(null, err);
	  console.log("Connected successfully to server");

	  const db = client.db(dbName);

	  client.close();
	});

app.use(bodyParser.urlencoded({extended: true}));



app.get("/",function(req,res){
	res.sendFile(__dirname + "/test.html");
});


app.listen(3000, function(){
	console.log("Server is running on port 3000.");
});