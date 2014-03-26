window.onload = function() {

    // window resize or rotate redraw canvas width/height

    var socket = io.connect(window.location.origin);
    document.ontouchmove = function(e){ e.preventDefault(); }

//  simulate clicks?



    var canvas = document.getElementById('myCanvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

    var debug = document.querySelector('#debug');
    var debug2 = document.querySelector('#debug2');
    var debug3 = document.querySelector('#debug3');
    var debug4 = document.querySelector('#debug4');

    socket.on('currentVolume', function (data) {
        // currentVolume = data.currentVolume
    });

    if(typeof currentVolume === 'undefined'){
        currentVolume = 50;
    };

    // var hammertime = Hammer(document).on("tap", function(event) {
    //         hammertime.options.prevent_default = true;
    //         var x = event.gesture.center.pageX;
    //         var y = event.gesture.center.pageY;
    //         var lineWidth = canvas.height / 25;
    //         var outerRadius = canvas.height / 10;
    //         var innerRadius = outerRadius - (lineWidth);
    //         // drawCircle(x,y,innerRadius);
    // });


    var hammertime = Hammer(document).on("drag", function(event) {
            // hammertime.options.prevent_default = true;
            var x = event.gesture.center.pageX;
            var y = event.gesture.center.pageY;
            var lineWidth = canvas.height / 50;
            var outerRadius = canvas.height / 10;
            var innerRadius = outerRadius - (lineWidth);
            drawSmall(x,y,innerRadius,outerRadius,lineWidth);
    });

    var hammertime = Hammer(document).on("release", function(event) {
        clearCanvas();
        debug.innerHTML = '';
        debug2.innerHTML = '';
        debug3.innerHTML = '';
        debug4.innerHTML = '';
        debug5.innerHTML = '';
        debug6.innerHTML = '';
    });


    var hammertime = Hammer(document).on("pinch", function(event) {
        hammertime.options.prevent_default = true;

        var x = event.gesture.center.pageX;
        var y = event.gesture.center.pageY;

        var startX0 = event.gesture.startEvent.touches[0].pageX;
        var startY0 = event.gesture.startEvent.touches[0].pageY;
        var startX1 = event.gesture.startEvent.touches[1].pageX;
        var startY1 = event.gesture.startEvent.touches[1].pageY;
        var startDiff = Math.sqrt(((startX1 - startX0) * (startX1 - startX0)) + ((startY1 - startY0) * (startY1 - startY0)));

        var scaleX0 = event.gesture.touches[0].pageX;
        var scaleY0 = event.gesture.touches[0].pageY;
        var scaleX1 = event.gesture.touches[1].pageX;
        var scaleY1 = event.gesture.touches[1].pageY;
        var scaleDiff = Math.sqrt(((scaleX1 - scaleX0) * (scaleX1 - scaleX0)) + ((scaleY1 - scaleY0) * (scaleY1 - scaleY0)));

        canvasW = canvas.height / 1.8;
        if (startDiff >= canvasW) {
            var innerRadius = canvasW;
            var outerRadius = scaleDiff;
            if ((innerRadius + 10) >= outerRadius) {
                var outerRadius = innerRadius + 10;
            }
            drawLarge(x,y,innerRadius,outerRadius);

                        if (event.gesture.scale >= 1) {
                            var newVol = currentVolume + ((100 - currentVolume) / ((canvas.height / 2.5) / (outerRadius - startDiff)));
                        } else {
                            // jumps when scale switches
                            var newVol = currentVolume * ((outerRadius - (innerRadius + 10)) / (startDiff - innerRadius ));
                        };

                        if (newVol > 100) {
                            var newVol = 100;
                        } else if (newVol < 0) {
                            var newVol = 0;
                        };
                        socket.emit('pop', { volslider: Math.floor(newVol)})

        } else {
            var innerRadius = scaleDiff;
            var outerRadius = canvasW;
            var lineWidth = 15;
            if (innerRadius >= (outerRadius - 30)) {
                var innerRadius = outerRadius - 30;
            };
            drawSmall(x,y,innerRadius,outerRadius, lineWidth);
        }

    });


    var requestAnimationFrame = window.requestAnimationFrame        ||
                                window.mozRequestAnimationFrame     ||
                                window.webkitRequestAnimationFrame  ||
                                window.msRequestAnimationFrame;

    function clearCanvas() {
        var context = canvas.getContext('2d');
        context.clearRect(0,0,canvas.width,canvas.height);
        renderGrid(50, "red");
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
        renderGrid(50, "red");

        // center
        context.beginPath();
            context.arc(centerX, centerY, 2, 0, 2 * Math.PI, false);
            context.fillStyle = 'rgba(255,255,255,1)';
            context.fill();
        context.closePath();

        // inner
        context.beginPath();
            context.arc(centerX, centerY, innerRadius/2, 0, 2 * Math.PI, false);
            context.lineWidth = 1;
            context.strokeStyle = 'rgba(255,255,255,1)';
            context.stroke();
        context.closePath();

        // outer
        context.beginPath();
            context.arc(centerX, centerY, outerRadius/2, 0, 2 * Math.PI, false);
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
            context.arc(centerX, centerY, innerRadius/2, 0, 2 * Math.PI, false);
            context.fillStyle = 'rgba(5, 247, 235,0.5)';
            context.fill();
        context.closePath();

        // outer
        context.beginPath();
            context.arc(centerX, centerY, outerRadius/2, 0, 2 * Math.PI, false);
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


    function renderGrid(gridPixelSize, color)    {
    var context = canvas.getContext('2d');

        context.save();
        context.lineWidth = 0.1;
        context.strokeStyle = color;

        // horizontal grid lines
        for(var i = 0; i <= canvas.height; i = i + gridPixelSize)
        {
            context.beginPath();
            context.moveTo(0, i);
            context.lineTo(canvas.width, i);
            context.closePath();
            context.stroke();
        }

        // vertical grid lines
        for(var j = 0; j <= canvas.width; j = j + gridPixelSize)
        {
            context.beginPath();
            context.moveTo(j, 0);
            context.lineTo(j, canvas.height);
            context.closePath();
            context.stroke();
        }

        context.restore();
    }

    renderGrid(50, "red");
};
