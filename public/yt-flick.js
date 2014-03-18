window.onload = function() {

    var socket = io.connect(window.location.origin);

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


    var searchBox = document.getElementById("search")

    searchBox.oninput = function(){
        var text = this.value;
        // socket.emit('Youtube', { searchQuery: text});
        socket.emit('youtubeSearch', { searchQuery: text});
    }

    socket.on('searchQuery', function (data) {
            if(data.searchQuery) {
                console.log(data.searchQuery)
            } else {
                console.log("There is a problem:", data);
            }
    });

    // socket.on('youtubedata', function (data) {
    //         if(data.youtubedata) {
    //             console.log(data)
    //             // player.loadVideoByUrl(data.url, 5, "large");
    //             // player.loadVideoById(data.url, 5, "large")
    //         } else {
    //             console.log("There is a problem:", data);
    //         }
    //     });

};
