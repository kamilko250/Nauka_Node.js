var path = require('path');
const https = require('https');
const express = require('express');
const fs = require('fs');
const app = express();
var fileupload = require("express-fileupload");
app.use(fileupload());
//app.listen(8000);
app.listen(process.env.PORT);
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

https.createServer(options);

app.get('/',function(req,res) 
{
    res.render('basicView.ejs');
});
app.get('/zad1',function(req,res)
{
    res.render('zad1.ejs',{number: 0 });
});
app.post('/zad1',function(req,res)
{
    min = Number(req.body.number.min);
    max = Number(req.body.number.max);
    var randomNumber = (Math.random() * max % (max-min) ) + min;
    res.render('zad1.ejs',{number: randomNumber });
});
app.get('/zad2', function(req,res)
{
    res.render('zad2.ejs',{number: 0});
});
app.post('/zad2',function(req,res)
{
    var file;
     if(!req.files)
    {
        res.send("File was not found");
         return;
    }
    file = req.files.textfile;  // here is the field name of the form
    str = file.data.toString('utf-8');
    var tab = str.split(',');
    var min1 = Number(tab[0]);
    var max1 = Number(tab[1]);
    randomNum = (Math.random() * max1 % (max1-min1) ) + min1;
    res.render('zad2.ejs',{number: randomNum});
});
app.get('/zad3',function(req,res)
{
    res.send('zad3 nie zostalo jeszcze dodane');
});
