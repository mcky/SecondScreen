var express = require("express");
var app = express();
var port = process.env.port || 3700;
var hbs = require('hbs');

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.get('/', function(req, res) {
    res.render('index', {title: "Home", scripts: [{script: "chat"}]});
});

app.get('/mobile', function(req, res) {
    res.render('Mobile', {title: "Mobile", scripts: [{script: "mobile"}]});
});

app.get('/gestures', function(req, res) {
        res.render('gestures', {title: "Gestures", scripts: [{script: "gestures"}]});
});

app.get('/canvas', function(req, res) {
        res.render('canvas', {title: "Canvas", scripts: [{script: "canvas"}]});
});

app.get('/keyboard', function(req, res) {
        res.render('keyboard', {title: "Keyboard", scripts: [{script: "keyboard"}]});
});

var io = require('socket.io').listen(app.listen(port));

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
});


console.log("Listening on port " + port);
