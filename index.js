const express = require('express');
var path = require('path');
const app = express();
app.listen(8000);
app.listen(process.env.PORT);
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());


var min = 0;
var max = 0;
var randomNumber = 0;
var randomNum = 0;

app.post('/randomBetween', function(request, res){
    min = Number(request.body.number.min);
    max = Number(request.body.number.max);
    randomNumber = (Math.random() * max % (max-min) ) + min;
    res.render('mainView.ejs', {numberRnd: randomNum, numberRnd_: randomNumber });
});
app.get('/', function (req, res)
{
    res.render('mainView.ejs', {numberRnd: randomNum, numberRnd_: randomNumber});
});

app.post('/random', function (req, res)
{
    randomNum = Math.random();
    res.render('mainView.ejs', {numberRnd: randomNum, numberRnd_: randomNumber});
});
