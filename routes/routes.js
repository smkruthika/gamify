var appRouter = function(app) {

    var  gameDetails = [];

    var userDetails = [];

	app.get("/game", function(req, res) {
   
   		res.contentType('application/json');
		res.send(JSON.stringify(gameDetails));

	});
	
	app.get("/game/:id", function(req, res) {
		
			var gameId = req.params.id;  
			var index = gameDetails.findIndex(x => x.id==gameId);
			if(index == null || index == 'undefined'){
				return res.send("404 - Game not found");
			}
			var jsonAtindex = gameDetails[index];
  			return res.send(jsonAtindex);

	});

	app.post("/game", validate(validation.login), function(req, res) {
    	
  		gameDetails.push(req.body);
        return res.send(req.body);

	});

	app.get("/user", function(req, res) {
   
       	res.contentType('application/json');
		res.send(JSON.stringify(userDetails));

	});

	app.get("/user/:name", function(req, res) {
  		
		var userName = req.params.name;    
		if(userName == null || userName == 'undefined'){
			return res.send("404 - UserName not found");
		}
		console.log(userName);
		var index = userDetails.findIndex(x => x.name==userName);
		if(index == null || index == 'undefined'){
			return res.send("404 - UserName not found");
		}
		console.log(index);  
		var jsonAtindex = userDetails[index];
  		return res.send(jsonAtindex);

	});

	app.post("/user", function(req, res) {
  
  		userDetails.push(req.body);
        return res.send(200);

	});
	//GIRIDHAR
	app.put("/user/:name", function(req, res) {
		var userName = req.params.name;
		var gameId = req.body.gameId;
		var points = req.body.points;
		//console.log(gameId)
		//console.log(points)
		var index = userDetails.findIndex(x => x.name == userName);
		if (index == null || index == 'undefined') {
			return res.send("404 - UserName not found");
		}
		console.log(index);
		var userData = userDetails[index];
		var games = userData.games;

		var game_index = games.findIndex(x => x.gameId == gameId);
		console.log(game_index)
		if (game_index == null || game_index == 'undefined' || game_index == -1) {
			console.log(" Game not found");
			var g1 = {
				"gameId": gameId,
				"gamePoint": points
			};
			userDetails[index].games.push(g1);
		} else {
			userDetails[index].games[game_index]["gamePoint"] = points;
		}


		var tot_points = 0;
		for (var i = 0; i < games.length; i++) {
			tot_points += games[i].gamePoint;
		}
		userDetails[index].points = tot_points;
		//console.log(userDetails[index])

		return res.send(200);

	});	
}


module.exports = appRouter; 