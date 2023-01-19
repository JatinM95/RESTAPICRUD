var express = require('express');
var jwt = require('jsonwebtoken');
const app = express();

// Endpoint to get a list of contacts   // public
app.get('/api', function(req,res){
    res.json({
        text: 'Hello, my api is running.....'
    });
});

// Endpoint for authentication
app.post('/api/login',function(req,res){
    // auth user
    const user = {FirstName:"Jatin",LastName:"Mangal",Email:"mangaljatin.100@gmail.com",Phone:8114489748,Password:12345};
    // new json web token
    const token = jwt.sign({user},'itsmypassiontocode@2023');
    // after login, server will return a token as response
    res.json({
        token:token
    });
});

// Endpoint to get a list of contacts after authentication
app.get('/api/protected',ensureToken,function(req,res){
    jwt.verify(req.token,'itsmypassiontocode@2023',function(err,data){
        if(err){ // if not verfied then will send an error status code 403
            res.sendStatus(403);
        }
        else{ // if verfied then get a response from server
            res.json({
                text: "This is protected",
                data: data
            });
        }
    })
});

// ensureToken is a middileware between auth section and prtected section to varify token
function ensureToken(req,res,next){
    const bearerHeader = req.headers["authorization"];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }
    else{
        res.sendStatus(403);
    }
}

// create a server to listen at port 3000
app.listen(3000,function(){
    console.log("App listening on port 3000!");
});

