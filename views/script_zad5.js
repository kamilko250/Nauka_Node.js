$( document ).ready(function(){
  $("leftform").submit(function(event){
    event.preventDefault();
    $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/zad5",
      data: $("#leftform").serialize(),
      dataType: "json",
      success: function(range){
        alert("something")
        $("#postResultDiv").html("<p>" + JSON.stringify(range) + "</p>")
      },
      error: function(err){
        alert("ERROR")  
      }
    })
  })
}) 


