// app.configure('production', function(){
//     require('./newrelic.js');
// });

var express = require("express");
var app = express();
var port = Number(process.env.PORT || 3700);
var hbs = require('hbs');
var io = require('socket.io').listen(app.listen(port));

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'html');
app.engine('html', hbs.__express);


app.get('/', function(req, res) {
    res.render('index', {title: "home", scripts: [{script : 'chat'}, {script : 'youtube'}]});
});

app.get('/canvas', function(req, res) {
        res.render('canvas', {title: "Canvas", scripts: [{script : 'hammer'}, {script: 'canvas'}]});
});

app.get('/keyboard', function(req, res) {
        res.render('keyboard', {title: "Keyboard", scripts: [{script: 'keyboard'}]});
});

app.get('/yt', function(req, res) {
        res.render('yt', {title: "YT", scripts: [{script : 'hammer'}, {script: 'yt-flick'}]});
});



io.sockets.on('connection', function (socket) {

	console.log('someone connected');

    socket.on('set nickname', function(nickname) {
    	socket.nickname = nickname;
    	console.log(nickname + ' joined the chat!');
    	socket.emit('message', { message: 'welcome to the chat ' + nickname });
    });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });

    socket.on('pop', function (data) {
        io.sockets.emit('volslider', data);
    });

    socket.on('keyboard', function (data) {
        io.sockets.emit('keyboardInput', data);
    });

    socket.on('doFunction', function (data) {
        io.sockets.emit('functionName', data);
    });

    socket.on('Youtube', function (data) {
        io.sockets.emit('youtubedata', data);
    });

    socket.on('youtubeSearch', function (data) {
        // ytSearch(data.searchQuery)
        // io.sockets.emit('searchQuery', data);
        console.log;
    });
});


console.log("Listening on port " + port);

var youtubeAPIkey = 'AIzaSyBxaLdWuMLvP9BktxAS6WVUuS7yo7OTH38';
// var youtubeAPIkey = 'AIzaSyA3CD6-nv0w-sKWS1wUEQojQMV9O4XqIgc'; //browser

var Youtube = require("youtube-api");

Youtube.authenticate({
    type: 'key',
    key: youtubeAPIkey
});

app.get('/yt2', function(req, res) {

    Youtube.search.list({
        "part": "string",
        // "mySubscribers": true,
        // "maxResults": 50
    }, function (err, data) {
        console.log(err, data);
        var ytres = err + ',' + data;
        res.render('yt2', {title: "YT", ytresult: ytres});
    });
});




url = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=wheelockcollege&type=channel&key=AIzaSyBxaLdWuMLvP9BktxAS6WVUuS7yo7OTH38";



