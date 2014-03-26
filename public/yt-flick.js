window.onload = function() {

    var socket = io.connect(window.location.origin);

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

    getTextContent();
    function getTextContent() {
        var searchItem = document.querySelectorAll(".result");
        var playlist = document.getElementById("playlist");
        for (var i=0,  tot=searchItem.length; i < tot; i++) {
            searchItem[i].onclick = function() {
                playlist.appendChild(this);
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
            };
        };
    };

    function showPreview(videoTitle, videoId) {
        var preview = document.getElementById('preview');

        preview.innerHTML = '<h2>' + videoTitle + '</h2>';

        var hammertime = Hammer(preview).on("swipeup", function(event) {
            // hammertime.options.prevent_default = true;
            socket.emit('Youtube', { youtubedata: 'data', url: videoId});
        });
    }







};
