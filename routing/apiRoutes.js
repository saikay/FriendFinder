var express = require("express");
var path = require("path");
// Core node package for reading and writing files
var fs = require("fs");

var apiRouters = express.Router();



//A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
apiRouters.get("/api/friends",function(req, res) {    
    //response with list of friends.
    console.log("requested list of friends");
    res.sendFile(path.join(__dirname, "../app/data/friends.js"));
    
});

//A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
apiRouters.post("/api/Friends",function(req, res) {
    console.log("received survey results.");

    //Read friends.js
    fs.readFile(path.join(__dirname,"../app/data/friends.js"), 'utf8',function(err,data){
        if(err){console.log(err);}
        var friends = JSON.parse(data);
        var newFriend = req.body;
        
        // Otherwise, it will print: "friends.js was updated!"
        console.log("friends.js was updated!");            
        //Logic matchFriends.
        if(friends.length >0){
            //currentScore set to highest possible points.
            currentScore = 50;
            //saves best match friend's index
            matchFriend = 0;
            
            for (var i = 0; i < friends.length; i++){
                console.log(friends[i].scores);
                let scoreDifference = 0;
                
                for (var j = 0; j < friends[i].scores.length;j++){
                    scoreDifference +=  Math.abs(friends[i].scores[j] - newFriend.scores[j]); 
                }
                if(scoreDifference < currentScore){
                    currentScore = scoreDifference;
                    matchFriend = i;
                }
                console.log(scoreDifference);
                
            }

            res.json(friends[matchFriend]);

        }else{
            res.json({
                name: "No match",
                photo: "unknown.jpg"
            })
        }
        
        //save post friend info.
        friends.push(newFriend);
        fs.writeFile(path.join(__dirname,"../app/data/friends.js"), JSON.stringify(friends), function(err) {

            // If the code experiences any errors it will log the error to the console.
            if (err) throw err;
        });

        
             
        
        
    });    
});


module.exports = apiRouters;