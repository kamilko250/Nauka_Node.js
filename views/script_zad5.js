$(document).ready(function()
{
  $("form").click(function(event)
  {
    alert("wea re");
    event.preventDefault();
  
    var formData = {
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
      alert("ERROR" + err.JSON)  
      console.log("ERROR:", err)
    }
  })
  }) 
})


