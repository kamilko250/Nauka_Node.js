$(document).ready(() => {
    $("#data_form").hide()
    $("#date_form").submit( event =>{
        $("#date_form").hide()
        $.post("zad8/logsrequest", {
            "date": $("#input_date").val(),
            "time": $("#input_time").val()
        }, 
        (data, status) => {
            console.log(status)
            console.log(data)
            CreateTable($("#logs_table"), data)

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
        table.empty()
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
            data["express"].forEach(element => {
                table.append("<tr>")
                table.append("<th>" + element["_id"] + "</th>")
                table.append("<th>" + element["date"] + "</th>")
                table.append("<th>" + element["file"] + "</th>")
                table.append("<th>" + element["message"] + "</th>")
                table.append("</tr>")
            })
        }
        
    }
})