var express = require('express');

var app = express();

var parser = require("body-parser");
var crypto = require('crypto');

var clients = [];
var score = {};
app.use(parser.urlencoded({extended:true}));
app.use(parser.json({extended:true}));

var secret = "abcdd";
// '/' -> "Hi there!"

var freeClient = function(res){
    //remove client from listeners
    var index = clients.indexOf(res);
    if (index > -1) {
      clients.splice(index, 1);
    }
}

var handleClient = function(req,res){
	res.writeHead(200, {
        Connection: "keep-alive",
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*"
      });
      
      clients.push(res);
      
      req.on('close',freeClient(res));
}

var pushToClients = function(data){
    clients.forEach(function(res){
        res.write("event: scoreUpdate\n");//event
        res.write("data: " + JSON.stringify(data)+"\n");//authorname
    })
}

app.get('/webhook' , function(req , res){
    handleClient(req,res);
})

app.post('/webhook' , function(req , res){
    //check auth
    let sig = crypto.createHmac('sha1', secret).update(JSON.stringify(req.body)).digest('hex');
    sig = "sha1="+ sig;
    if(sig == req.headers['x-hub-signature'] ){
    	console.log("verified sig");
    }
	var author = req.body["commits"][0]["author"]["username"];
// 	if (score[author]) {
// 	    score[author] += 1;
// 	} else {
// 	    score[author] = 1;
// 	}
// 	// push score as json to frontend
// 	console.log(author);
	res.sendStatus(200);
	pushToClients(author);
})

var server = app.listen(process.env.PORT , process.env.IP , function(){
    console.log("Server has been started!!");
})