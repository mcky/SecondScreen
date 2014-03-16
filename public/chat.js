window.onload = function() {

    var messages = [];
    var socket = io.connect(window.location.origin);

    socket.on('connect', function (data) {
        console.log('we are connected');
        // name = prompt('What is your name?');
        name = 'tempName';
        this.emit('set nickname', name)
    });

//
//
//
    var sendButton = document.getElementById("send");
    sendButton.onclick = function() {
        var field = document.getElementById("field");
        var content = document.getElementById("content");

        if(name.value == "") {
            // alert("Please type your name!");
        } else {
            var text = field.value;
            socket.emit('send', { message: text, username: name });
            field.value='';
        }
    };

    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
                html += messages[i].message + '<br />';
            }
            content.innerHTML = html;
            console.log(data.message);
        } else {
            console.log("There is a problem:", data);
        }
    });

//
//
//
    var otherButton = document.getElementById("other");

    otherButton.onclick = function() {
            socket.emit('doFunction', { functionName: 'xxx', argx: 'myargs' });
    };

    socket.on('functionName', function (data) {
        if(data.functionName) {
            console.log(data)
            // if (data.functionName == 'xxx') {
            //     myFunction(data.argx);
            // } else {
            //     console.log('not xxx')
            // };
        } else {
            console.log("There is a problem:", data);
        }
    });

    function myFunction(args) {
        console.log('myFunction triggered, args: ' + args);
    };

//
//
//

    socket.on('keyboardInput', function (data) {
        if(data.keyboardInput) {
            var output = document.getElementById("recievedInput");
            var html = '';
                html += data.keyboardInput;
            output.innerHTML = html;
        } else {
            console.log("There is a problem:", data);
        }
    });
//
//
//

    document.querySelector('#slider').onchange = function(){
        var num = this.value;
        socket.emit('pop', { volslider: num});
    }

    socket.on('volslider', function (data) {
        if(data.volslider) {
            document.querySelector('#slideroutput').value = data.volslider;
            document.querySelector('#slider').value = data.volslider;
        } else {
            console.log("There is a problem:", data);
        }
    });
}
