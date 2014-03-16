window.onload = function() {

    var socket = io.connect(window.location.origin);

    document.querySelector('#slider').onchange = function(){
        var num = this.value;
        socket.emit('pop', { volslider: num});
    }

    socket.on('volslider', function (data) {
        if(data.volslider) {
            document.querySelector('#slideroutput').value = data.volslider;
            document.querySelector('#slider').value = data.volslider;
        } else {
            console.log("There is a problem2:", data);
        }
    });
}
