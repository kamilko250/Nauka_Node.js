const express = require('express');
var http = require('http');
const app = express();
app.listen(process.env.PORT);

app.use(express.urlencoded());
app.use(express.json());

app.post('/', function(request, response){
    var min = Number(request.body.number.min);
    var max = Number(request.body.number.max);
    var randomNumber =( Math.random() * max) + min;
    res.send({randomNumber});
});

