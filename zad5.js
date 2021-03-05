$("Random").on("click", function(event)
{
    event.preventDeafult();
    event.StopPropagation();
    const id = $(this).attr('data-id');
    $.ajax(
    {
        url:   1, 
        method: "POST",
        data: { id: id }
    })
}) 