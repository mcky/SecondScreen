// app.configure('production', function(){
//     require('./newrelic.js');
// });

var express = require("express");
var app = express();
var port = Number(process.env.PORT || 3700);
var hbs = require('hbs');

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'html');
app.engine('html', hbs.__express);

var io = require('socket.io').listen(app.listen(port));
io.enable('browser client minification');  // send minified client
io.enable('browser client gzip');          // gzip the file

app.get('/', function(req, res) {
    res.render('index', {title: "home", scripts: [{script : 'player'}, {script : 'youtube'}]});
});

app.get('/canvas', function(req, res) {
        res.render('canvas', {title: "Canvas", scripts: [{script : 'hammer.min'}, {script: 'canvas'}]});
});

app.get('/keyboard', function(req, res) {
        res.render('keyboard', {title: "Keyboard", scripts: [{script: 'keyboard'}]});
});

app.get('/yt', function(req, res) {
        res.render('yt', {title: "YT", scripts: [{script : 'hammer.min'}, {script: 'yt'}]});
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
        io.sockets.emit('searchQuery', data);
        var searchQuery = data.searchQuery;
        ytSearch(searchQuery);
    });
});


console.log("Listening on port " + port);


var Youtube = require("youtube-api");

Youtube.authenticate({
    type: 'key',
    key: 'AIzaSyBxaLdWuMLvP9BktxAS6WVUuS7yo7OTH38'
});

function ytSearch(searchQuery) {
    Youtube.search.list({
        q: searchQuery,
        "part": "snippet",
        "maxResults": 5
        // "mySubscribers": true,
        // "maxResults": 50
    }, function (err, data) {
        console.log(err, data);
            io.sockets.emit('searchResult', data);
    });
};


