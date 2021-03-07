$(document).ready(() => {
    
    $("#button_on").click(event => {
        //start display 
        $("#display").text("display switched on")
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