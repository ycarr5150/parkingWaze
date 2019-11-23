const express = require("express");
const mysql = require('mysql');
const session = require('express-session');
const app = express();

app.engine('html', require('ejs').renderFile);
app.use(express.static("public"));

// Enable sessions
app.use(session({
  secret: '6wOBwJBStY'
}));

app.get('/', function(req, res) {
    res.render("login.html");
});

app.post('/', function(req, res) {
    let successful = false;
    let message = '';
    
    // TODO: replace with MySQL SELECT and hashing/salting...
    if (req.body.username === "hello" && req.body.password === "world") {
        successful = true;
        req.session.username = req.body.username;
    } else {
        // delete the user as punishment!
        delete req.session.username;
        message = 'Wrong username or password!'
    }
    
    // Return success or failure
    res.json({
        successful: successful,
        message: message
    });
});

app.get('/logout', function(req, res) {
    if (req.session && req.session.username && req.session.username.length) {
        delete req.session.username;
    }

    res.json({
        successful: true,
        message: ''
    });
});

app.get('/map', function(req, res, next) {
    // const connection = mysql.createConnection({
    //     host: 'mcldisu5ppkm29wf.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    //     user: 'zzrbbsj5791xsnwf',
    //     password: 'l4kg72cf660m8hya',
    //     database: 'l2gh8fug1cqr96dc'
    // });
    
    // connection.connect();
    // connection.end(); 
    
    if (req.session && req.session.username && req.session.username.length) {
        res.render('map.html');
    }
    else {
        delete req.session.username;
        res.redirect('/');
    }
});

// server listener 
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Running Express Server...");
});
