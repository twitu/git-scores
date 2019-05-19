var express = require('express');
var app = express();
var parser = require("body-parser");
var crypto = require('crypto');
app.use(parser.json({extended:true}));
var secret = "github-leaderboard-secret";
var scoreTable = {
    "lsampras": 1,
    "twitu": 2,
};

var clients = [];
var freeClient = function(res){
    //remove client from listeners
    console.log("client close");
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
  
  req.on('close',()=>freeClient(res));
}

var pushToClients = function(){
    let scores = []
    for (let nick in scoreTable) {
        let item = {};
        item.nick = nick;
        item.score = scoreTable[nick];
        item.rank = 0;
        scores.push(item)
    }
    
    scores.sort((a, b) => {a.score - b.score});
    
    for (let index in scores) {
        scores[index].rank = parseInt(index) + 1; 
    }
    
    let eventString = "id: 1\nevent: scoreUpdate\ndata: " + JSON.stringify(scores) + "\n\n";
    console.log(eventString);
    
    clients.forEach(function(res){
        res.write(eventString);
        // console.log(scores);
    })
}

var updateScores = function(req){
    let author = req.body["commits"][0]["author"]["username"];
    if (scoreTable.author) {
	    scoreTable.author += 1;
	} else {
	    scoreTable.author = 1;
	}
}

app.get('/webhook' , function(req , res){
    console.log("client request");
    handleClient(req,res);
})

app.post('/webhook' , function(req , res){
    //check authentication
    let sig = crypto.createHmac('sha1', secret).update(JSON.stringify(req.body)).digest('hex');
    sig = "sha1="+ sig;
    if(sig == req.headers['x-hub-signature'] ){
    	console.log("verified sig");
    	res.sendStatus(200);
    	pushToClients();
    }else{
        //handle fake request
        console.log("auth failed")
    }
})

var server = app.listen(process.env.PORT, function(){
    console.log("Server has been started!!");
})