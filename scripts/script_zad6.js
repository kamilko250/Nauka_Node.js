$(document).ready(() => {
    var socket = io().disconnect()
    var freq
    $("#button_on").click(event => {
        //start display 
        socket.connect()
        freq = $("#input_range").val()
        $("#button_on").attr("disabled", true);
        $("#button_off").attr("disabled", false);
        $("#status").text("display switched on")
        $("#freq").text("Interval time: " + freq)
        socket.emit("freq", freq)
        event.preventDefault()
        return false
    })
    $("#button_off").click(event => {
        //stop display
        socket.disconnect()
        $("#button_on").attr("disabled", false);
        $("#button_off").attr("disabled", true);
        $("#status").text("display switched off")
        event.preventDefault()
        return false
    })
    socket.on('number', (data)=>{
        $("#display").text(data.toFixed(2))
    })
})