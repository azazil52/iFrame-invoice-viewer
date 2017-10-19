'use strict';

var express = require('express');

var app = express();

// Defines the folder paths
app.use('/public', express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

// Binds the application to a local port address
app.listen('3000',function(){
    console.log('Server running at http://localhost:3000 !!')
})

// Defines default page to render when the server is started
app.get('/',function(req,res){
	res.sendFile('main.html',{'root':__dirname + '/public'});
})