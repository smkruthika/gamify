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
}


module.exports = appRouter; 