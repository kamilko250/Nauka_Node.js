$(document).ready(() => {
    const socket = io()
    $("#button_on").click(event => {
        //start display 
        $("#display").text("display switched on")
        //socket.connect('http://localhost:443')
        event.preventDefault()
        return false
    })
    $("#button_off").click(event => {
        //stop display
        $("#display").text("display switched off")
        event.preventDefault()
        return false
    })
})