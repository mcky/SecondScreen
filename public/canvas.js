window.onload = function() {

    // window resize or rotate redraw canvas width/height

    var socket = io.connect(window.location.origin);

    var canvas = document.getElementById('myCanvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

    var debug = document.querySelector('#debug');
    var debug2 = document.querySelector('#debug2');
    var debug3 = document.querySelector('#debug3');
    var debug4 = document.querySelector('#debug4');

    var hammertime = Hammer(document).on("tap", function(event) {
            hammertime.options.prevent_default = true;
            var x = event.gesture.center.pageX;
            var y = event.gesture.center.pageY;
            var lineWidth = canvas.height / 25;
            var outerRadius = canvas.height / 10;
            var innerRadius = outerRadius - (lineWidth);
            // drawCircle(x,y,innerRadius);
    });

    var hammertime = Hammer(document).on("drag", function(event) {
            hammertime.options.prevent_default = true;
            var x = event.gesture.center.pageX;
            var y = event.gesture.center.pageY;
            var lineWidth = canvas.height / 50;
            var outerRadius = canvas.height / 10;
            var innerRadius = outerRadius - (lineWidth);
            drawSmall(x,y,innerRadius,outerRadius,lineWidth);

            var startPos = event.gesture.startEvent.touches;

            var startY = startPos[0].pageY;
            var startX = startPos[0].pageX;
            var moveX = event.gesture.deltaX;
            var moveY = event.gesture.deltaY;

            debug.innerHTML = canvas.width;
            debug2.innerHTML = 'X: '+ startX;

            var newVol = Math.floor(((moveY / canvas.height) * 50)+50);

            debug3.innerHTML = newVol;
            socket.emit('pop', { volslider: newVol});
            // debug3.innerHTML = event.gesture.deltaY;
            debug4.innerHTML = startX - moveX;

            // debug.innerHTML = 'height: ' + window.innerHeight + '  pageY: ' + y;
            // debug2.innerHTML = event.gesture.deltaY;
            // var percentage = Math.floor((event.gesture.deltaY / window.innerHeight) * 100);
            // debug3.innerHTML = percentage;
            // var volume =  percentage * 0.9;
            // debug4.innerHTML = volume;
            // console.log(event.gesture.distance);


            //pageY 0 = 100%
            //pageY 100 = 0%

            //would skip volume

    });

      var hammertime = Hammer(document).on("dragend", function(event) {
        console.log(arguments)
    });

    var hammertime = Hammer(document).on("dragend", function(event) {
        clearCanvas();
    });

    var hammertime = Hammer(document).on("dragup", function(event) {
            hammertime.options.prevent_default = true;

            // debug.innerHTML = 'dragup'
            // debug2.innerHTML = event.gesture.deltaY;
            // console.log(event.gesture.distance);
    });

    var hammertime = Hammer(document).on("dragdown", function(event) {
            hammertime.options.prevent_default = true;

            // debug.innerHTML = 'dragdown'
            // debug2.innerHTML = event.gesture.distance;
            // console.log(event.gesture.distance);
    });

    var hammertime = Hammer(document).on("pinch", function(event) {
        hammertime.options.prevent_default = true;

        var x = event.gesture.center.pageX;
        var y = event.gesture.center.pageY;
        var scale = event.gesture.scale;

        var startPos = event.gesture.startEvent.touches;
        var startY0 = startPos[0].pageY;
        var startX0 = startPos[0].pageX;
        var startY1 = startPos[1].pageY;
        var startX1 = startPos[1].pageX;
        debug.innerHTML = 'Y0: '+ startY0 +' Y1: '+ startY1;
        debug2.innerHTML = 'X0: '+ startX0 +' X1: '+ startX1;
        var maxX = Math.max(startX0, startX1);
        var minX = Math.min(startX0, startX1);
        var maxY = Math.max(startY0, startY1);
        var minY = Math.min(startY0, startY1);
        var diffY = maxY - minY;
        var diffX = maxX - minX;
        debug3.innerHTML = 'X: ' + diffX + '    Y: ' + diffY;

        if (diffX < 100 && diffY < 200){
            var outerRadius = canvas.height / 3.5;
            var lineWidth = 25;

            // var lineWidth = canvas.height / 25;
            // var outerRadius = canvas.height / 10;
            // var innerRadius = outerRadius - (lineWidth);
            if (scale > 1.7) {
                var innerRadius = outerRadius - 20;
            } else {
                var scale = scale / 2;
                var innerRadius = scale * outerRadius;
            };
            drawSmall(x,y,innerRadius,outerRadius, lineWidth);

        } else {
            var innerRadius = canvas.height / 4;
            if (scale > 1) {
                var outerRadius = scale * (innerRadius + 20);
            } else {
                var outerRadius = innerRadius + 10;
            };
            drawLarge(x,y,innerRadius,outerRadius);
        };

    });

    document.ontouchmove = function(e){ e.preventDefault(); }

    var requestAnimationFrame = window.requestAnimationFrame        ||
                                window.mozRequestAnimationFrame     ||
                                window.webkitRequestAnimationFrame  ||
                                window.msRequestAnimationFrame;

    function clearCanvas() {
        var context = canvas.getContext('2d');
        context.clearRect(0,0,canvas.width,canvas.height);
    };


// var angle = 1;
// function drawCircle(centerX, centerY, innerRadius) {
//     var context = canvas.getContext('2d');
//     context.clearRect(0,0,canvas.width,canvas.height);

//     context.beginPath();
//         // context.arc(225, 225, 175, 0, Math.PI * 2, false);
//         context.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI, false);
//     context.closePath();

//     // color in the circle
//     context.lineWidth = 1;
//     context.strokeStyle = 'rgba(255,255,255,'+ angle +')';
//     context.stroke();
//     angle += -0.02;

//     if (angle > 0){ requestAnimationFrame(drawCircle); } else { angle = 1; };
//     // requestAnimationFrame(drawCircle);
// }

// drawCircle();
//     function drawCircle(centerX, centerY, innerRadius) {
//         var context = canvas.getContext('2d');
//         context.clearRect(0,0,canvas.width,canvas.height);
//         fade = true,
//         fadeVal = 1;
//         context.globalAlpha = 1;

//         function loop() {
//         if (fade === true) {
//             context.globalAlpha = 1 + (1-fadeVal);
//             context.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI, false);
//             context.lineWidth = 1;
//             context.strokeStyle = 'rgba(0,0,0,' + (1 - fadeVal) + ')';
//             context.stroke();

//             fadeVal -= 0.02;
//         }
//         if (fadeVal >= 0) requestAnimationFrame(loop);
//         }

//         loop();

//         // inner
//         context.beginPath();
//             context.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI, false);
//             context.lineWidth = 1;
//             context.strokeStyle = 'rgba(255,255,255,1)';
//             context.stroke();
//         context.closePath();
//     };


    function drawSmall(centerX, centerY, innerRadius, outerRadius, lineWidth) {
        var context = canvas.getContext('2d');
        context.clearRect(0,0,canvas.width,canvas.height);

        // center
        context.beginPath();
            var radius = 2;
            context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            context.fillStyle = 'rgba(255,255,255,1)';
            context.fill();
        context.closePath();

        // inner
        context.beginPath();
            context.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI, false);
            context.lineWidth = 1;
            context.strokeStyle = 'rgba(255,255,255,1)';
            context.stroke();
        context.closePath();

        // outer
        context.beginPath();
            context.arc(centerX, centerY, outerRadius, 0, 2 * Math.PI, false);
            context.lineWidth = lineWidth;
            context.strokeStyle = 'rgba(5, 247, 235,0.5)';
            context.stroke();
        context.closePath();
    };


    function drawLarge(centerX, centerY, innerRadius, outerRadius) {
        var context = canvas.getContext('2d');
        context.clearRect(0,0,canvas.width,canvas.height);

        // inner
        context.beginPath();
            context.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI, false);
            context.fillStyle = 'rgba(5, 247, 235,0.5)';
            context.fill();
        context.closePath();

        // outer
        context.beginPath();
            context.arc(centerX, centerY, outerRadius, 0, 2 * Math.PI, false);
            context.lineWidth = 1;
            context.strokeStyle = 'rgba(255,255,255,1)';
            context.stroke();
        context.closePath();

        // center
        context.beginPath();
            var radius = 2;
            context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            context.fillStyle = 'rgba(255,255,255,1)';
            context.fill();
        context.closePath();

    };
};
