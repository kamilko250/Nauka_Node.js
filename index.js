const express = require('express');

const app = express();
app.listen(process.env.PORT);
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
    var randomNumber =(( Math.random() * max ) + min )% max;
    res.send({randomNumber});
});
