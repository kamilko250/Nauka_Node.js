const express = require('express');
var path = require('path');
const app = express();
app.listen(8000);
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
//app.listen(process.env.PORT);

var min = 0;
var max = 0;
var randomNumber =0;

app.post('/randomBetween', function(request, response){
    min = Number(request.body.number.min);
    max = Number(request.body.number.max);
    randomNumber = (Math.random() * max % (max-min) ) + min;
    res.render('/template.ejs', {number: randomNumber});
});


app.get('/random', function (req, res)
{
    randomNumber = Math.random();
    res.render('/mainView.ejs', {number: randomNumber});
});
app.get('/',function(req,res)
{
    res.render('home.ejs');
});