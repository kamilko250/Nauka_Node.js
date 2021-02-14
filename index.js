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

app.all('/', function (req, res)
{
    res.send('Hello world!');
});

app.get('/api/getRandomNumber', function(req,res)
{
    res.send({randomNumber: Math.random()});
});

app.get('/api/random/min/:min/max/:max', function (req, res)
{
    var min = Number(req.params.min);
    var max = Number(req.params.max);
    var randomNumber =( Math.random() * max) + min;
    res.send({randomNumber});
});
