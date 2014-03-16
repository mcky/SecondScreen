window.onload = function() {

    var socket = io.connect(window.location.origin);

    var editable = document.getElementById("contenteditable")
    editable.focus();

    editable.oninput = function(){
    // document.querySelector('#text').oninput = function(){
        var text = this.innerHTML;
        // socket.emit('keyboard', { keyboardInput: text});
        socket.emit('keyboard', { keyboardInput: text});
    }

    socket.on('keyboardInput', function (data) {
        if(data.keyboardInput) {
            // keeps resetting cursor position
            // editable.innerHTML = data.keyboardInput;
        } else {
            console.log("There is a problem:", data);
        }
    });
}
