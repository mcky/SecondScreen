window.onload = function() {

    var socket = io.connect(window.location.origin);

    var debug = document.querySelector('#debug');
    var debug2 = document.querySelector('#debug2');
    var debug3 = document.querySelector('#debug3');
    var debug4 = document.querySelector('#debug4');

    var hammertime = Hammer(document).on("swipeup", function(event) {
            hammertime.options.prevent_default = true;
            var text = event.gesture.target;
            // alert(text)
            console.log(text)
            var text = text.href;
            console.log(text);
            var video_id = text.match(/v=(.{11})/)[1];
            socket.emit('Youtube', { youtubedata: 'data', url: video_id});
            // var x = event.gesture.center.pageX;
            // var y = event.gesture.center.pageY;
            // var lineWidth = canvas.height / 25;
            // var outerRadius = canvas.height / 10;
            // var innerRadius = outerRadius - (lineWidth);
    });

};
