
    $(document).ready(function()
    {
      $("form").submit(function(event)
      {
        alert("wea re");
        event.preventDefault();
      })
      var formData =
        {
            min: $("#leftmin").val(),
            max: $("#leftmax").val()
        }
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/zad5",
            data: JSON.stringify(formData),
            dataType: "json",
            success: function(range)
            {
              alert("something")
                $("#postResultDiv").html("<p>" + JSON.stringify(range) + "</p>")
            },
            error: function(err)
            {
                alert("ERROR")  
                console.log("ERROR:", err)
            }
        }).done(function()
        {
            console.log(data)
        })
    }) 

