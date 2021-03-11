$(document).ready(() => {
    $("#data_form").hide()
    $("#date_form").submit( event =>{
        $("#date_form").hide()
        $.post("zad8/logsrequest", {
            "date": 1,
            "time": 4
        }, 
        (data, status) => {
            console.log(status)
            console.log(data)
            CreateTable($("#logs_table", data))

        })
        event.preventDefault()
        return false
    })
    $("#show").click( event => {
        $("#date_form").show()
        event.preventDefault()
        return false
    })
    function CreateTable(table, data)
    {
        console.log(typeof(data))
        if(typeof(data) != "undefined")
        {

            table.append("<caption>Logs</caption>")
            table.append("<tr>")
            table.append("<th>ID</th>")
            table.append("<th>Date</th>")
            table.append("<th>File</th>")
            table.append("<th>Message</th>")
            table.append("</tr>")
            data.forEach(element => {
                table.append("<tr>")
                table.append("<th>" + element["ID"] + "</th>")
                table.append("<th>" + element["Date"] + "</th>")
                table.append("<th>" + element["File"] + "</th>")
                table.append("<th>" + element["Message"] + "</th>")
                table.append("</tr>")
            })
        }
        
    }
})