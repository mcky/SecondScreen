window.onload = function() {

    // window resize or rotate redraw canvas width/height

    var socket = io.connect(window.location.origin);

    document.ontouchmove = function(e){ e.preventDefault(); }


    var searchBox = document.getElementById("searchbox");
    searchBox.oninput = function(){
        var text = this.value;
        // scope to only return to device that sent
        socket.emit('youtubeSearch', { searchQuery: text});
    };

    var searchResults = document.getElementById("searchresults");
    socket.on('searchResult', function (data) {
            console.log('searchResult: '+ data);

            var searchItems = data.items;
            var html = '';
            for (var i=0,  tot=searchItems.length; i < tot; i++) {
                console.log(searchItems[i].snippet.title);
                html += '<li class="result" data-videotitle="' + searchItems[i].snippet.title +'" data-videoID="' + searchItems[i].id.videoId + '">' + searchItems[i].snippet.title + '</li>';
            };
            searchResults.innerHTML = html;
            // searchItem = document.querySelectorAll(".result");
            getTextContent();
    });

    function getTextContent() {
        var searchItem = document.querySelectorAll(".result");
        var playlist = document.getElementById("playlist");
        for (var i=0,  tot=searchItem.length; i < tot; i++) {
            searchItem[i].onclick = function() {
                // playlist.appendChild(this);
                playlist.insertBefore(this, playlist.firstChild);
                this.classList.add('playlistitem');
                this.classList.remove('result');
                addPreview();
            };
        };
    };

    // addPreview();
    function addPreview(){
        var playlistItem = document.querySelectorAll(".playlistitem");
        for (var i=0,  tot=playlistItem.length; i < tot; i++) {
            playlistItem[i].onclick = function() {
                this.classList.add('previewing');
                var videoId = this.dataset.videoid;
                var videoTitle = this.dataset.videotitle;
                var preview = document.getElementById('preview');
                preview.classList.remove('hidden');
                showPreview(videoTitle, videoId);
                socket.emit('Youtube', { youtubedata: 'data', url: videoId});
            };
        };
    };

    function showPreview(videoTitle, videoId) {
        var preview = document.getElementById('preview');

        preview.innerHTML = '<h2>' + videoTitle + '</h2>';

        var hammertime = Hammer(document).on("swipeup", function(event) {
        // var hammertime = Hammer(preview).on("swipeup", function(event) {
            hammertime.options.prevent_default = true;
            socket.emit('Youtube', { youtubedata: 'data', url: videoId});
        });
    }










//  simulate clicks?
    var canvas = document.getElementById('myCanvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

    socket.on('currentVolume', function (data) {
        // currentVolume = data.currentVolume
    });

    if(typeof currentVolume === 'undefined'){
        currentVolume = 50;
    };

    var hammertime = Hammer(document).on("pinch", function(event) {
        canvas.classList.remove('hidden');
    });

    // var hammertime = Hammer(document).on("swipeleft", function(event) {
    //     document.getElementById('playlistbox').scrollIntoView(true);
    // });

    // var hammertime = Hammer(document).on("swiperight", function(event) {
    //     document.getElementById('search').scrollIntoView(true);
    // });



    // var hammertime = Hammer(document).on("drag", function(event) {
    //         // hammertime.options.prevent_default = true;
    //         var x = event.gesture.center.pageX;
    //         var y = event.gesture.center.pageY;
    //         var lineWidth = canvas.height / 50;
    //         var outerRadius = canvas.height / 10;
    //         var innerRadius = outerRadius - (lineWidth);
    //         console.log('drag');
    //         drawSmall(x,y,innerRadius,outerRadius,lineWidth);
    // });

    var hammertime = Hammer(document).on("release", function(event) {
        clearCanvas();
        canvas.classList.add('hidden');
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

                        // if (event.gesture.scale >= 1) {
                            // var newVol = currentVolume + ((100 - currentVolume) / ((canvas.height / 2.5) / (outerRadius - startDiff)));
                            var currentVolume = 27
                            var newVol = (((100 - currentVolume) / (canvas.height / 2.5))) * (outerRadius - startDiff);
                        // } else {
                            // var newVol = currentVolume * ((outerRadius - (innerRadius + 10)) / (startDiff - innerRadius ));
                            // var newVol = ((currentVolume / (outerRadius - (innerRadius + 10)))) * (outerRadius - startDiff);
                        // };

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

    window.addEventListener('resize', clearCanvas, false);

    var requestAnimationFrame = window.requestAnimationFrame        ||
                                window.mozRequestAnimationFrame     ||
                                window.webkitRequestAnimationFrame  ||
                                window.msRequestAnimationFrame;

    function clearCanvas() {
        var context = canvas.getContext('2d');
        context.clearRect(0,0,canvas.width,canvas.height);
    };

    function drawSmall(centerX, centerY, innerRadius, outerRadius, lineWidth) {
        var context = canvas.getContext('2d');
        context.clearRect(0,0,canvas.width,canvas.height);

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
};
