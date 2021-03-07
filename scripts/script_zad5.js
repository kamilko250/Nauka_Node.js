$( document ).ready(function(){
  $("leftform").submit(function(event){
    event.preventDefault();
    $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/zad5",
      data: $("#leftform").serialize(),
      dataType: "json",
      success: function(data,status,xhr){
        alert("something")
        //$("#postResultDiv").html("<p>" + data + "</p>")
      },
      error: function(xhr, status, error){
        alert("") 
      }
    })
  })
}) 


