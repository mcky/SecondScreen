window.onload = function() {

    var messages = [];
    var socket = io.connect('http://192.168.0.2:3700');



    // var hammertime = Hammer(document).on("tap", function(event) {
    //     hammertime.options.prevent_default = true;

    //     socket.emit('doFunction', { functionName: 'tap', argx: 'taplocation?' });

    //     //canvassy crap
    //     var centerX = event.gesture.center.pageX;
    //     var centerY = event.gesture.center.pageY;
    //     var canvas = document.getElementById('myCanvas');
    //     canvas.width = window.innerWidth;
    //     canvas.height = window.innerHeight;
    //     var context = canvas.getContext('2d');
    //     var radius = 50;

    //     context.beginPath();
    //     context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    //     context.fillStyle = 'green';
    //     context.fill();
    //     // context.lineWidth = 5;
    //     // context.strokeStyle = '#003300';
    //     // context.stroke();
    // });

    // var hammertime = Hammer(document).on("swipeup", function(event) {
    //     hammertime.options.prevent_default = true;

    //     socket.emit('doFunction', { functionName: 'swipeup', argx: 'taplocation?' });
    // });

     var hammertime = Hammer(document).on("pinch", function(event) {
        hammertime.options.prevent_default = true;

        var centerX = event.gesture.center.pageX;
        var centerY = event.gesture.center.pageY;

    });


    // var all_events = ["touch", "release", "hold", "tap", "doubletap", "dragstart", "drag", "dragend", "dragleft", "dragright", "dragup", "dragdown", "swipe", "swipeleft", "swiperight", "swipeup", "swipedown", "transformstart", "transform", "transformend", "rotate", "rotateleft", "rotateright", "pinch", "pinchin", "pinchout"];
    // var all_events = ["hold", "tap", "doubletap", "drag", "dragleft", "dragright", "dragup", "dragdown", "swipe", "swipeleft", "swiperight", "swipeup", "swipedown", "transformstart", "transform", "transformend", "rotate", "rotateleft", "rotateright", "pinch", "pinchin", "pinchout"];


    // function logArrayElements(element, index, array) {
    //     var hammertime = Hammer(document).on(element, function(event) {
    //     hammertime.options.prevent_default = true;

    //     socket.emit('doFunction', { functionName: element, argx: 'taplocation?' });
    // });
    // }
};
