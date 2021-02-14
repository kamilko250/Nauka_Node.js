const express = require('express');

const app = express();
app.listen(process.env.PORT);

app.use(express.urlencoded());
app.use(express.json());

var min = 0;
var max = 0;

app.post('/', function(request, response){
    min = Number(request.body.number.min);
    max = Number(request.body.number.max);
    var randomNumber = (Math.random() * max % (max-min) ) + min ;
    response.send({randomNumber});
});


app.get('/', function (req, res)
{
    var randomNumber = Math.random();
    res.send({randomNumber});
});
