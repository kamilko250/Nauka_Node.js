$(document).ready(() => {
    var socket = io().disconnect()
    $("#button_on").click(event => {
        //start display 
        socket.connect()
        $("#status").text("display switched on")
        //socket.connect('http://localhost:443')
        event.preventDefault()
        return false
    })
    $("#button_off").click(event => {
        //stop display
        socket.disconnect()
        $("#status").text("display switched off")
        event.preventDefault()
        return false
    })
    socket.on('number', (data)=>{
        $("#display").text(data.toFixed(2))
    })
})