var path = require('path');
const express = require('express');
const fs = require('fs');
const app = express();
var fileupload = require("express-fileupload");
app.use(fileupload());
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
var randomNumFile = 0;

app.post('/randomBetween', function(req, res){
    min = Number(req.body.number.min);
    max = Number(req.body.number.max);
    randomNumber = (Math.random() * max % (max-min) ) + min;
    res.render('mainView.ejs', {numberRnd: randomNum, numberRnd_: randomNumber, numberRndFile_: randomNumFile});
});
app.get('/',function(req,res) 
{
    res.render('basicView.ejs');
})
/*app.get('/', function (req, res)
{
    res.render('mainView.ejs', {numberRnd: randomNum, numberRnd_: randomNumber, numberRndFile_: randomNumFile});
});*/

app.post('/random', function (req, res)
{
    randomNum = Math.random();
    res.render('mainView.ejs', {numberRnd: randomNum, numberRnd_: randomNumber, numberRndFile_: randomNumFile});
});
app.post("/upload", function(req, res)
{
    var file;

     if(!req.files)
    {
        res.send("File was not found");
         return;
    }

    file = req.files.textfile;  // here is the field name of the form
    var buffer = file.data;
    str = buffer.toString('utf-8');
    var tab = str.split(',');
    var min1 = Number(tab[0]);
    var max1 = Number(tab[1]);
    randomNumFile = (Math.random() * max1 % (max1-min1) ) + min1;
    console.log(min1);
    console.log(max1);
    console.log(randomNumFile);
    res.render('mainView.ejs', {numberRnd: randomNum, numberRnd_: randomNumber, numberRndFile_: randomNumFile});
});

