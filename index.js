var path = require('path');
var fileupload = require("express-fileupload");
const fs = require('fs');
const https = require('http');
const express = require('express');
const app = express();
var fileNum = 0;
const options = {
   key: fs.readFileSync(__dirname + '/private.key', 'utf8'),
  cert: fs.readFileSync(__dirname + '/public.crt', 'utf8')
};
var server = https.createServer(options, app);

app.use(fileupload());
//app.listen(443);
app.listen(process.env.PORT);
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

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

    var filePath = path.join(__dirname + "/no_results/wynik.txt");

    fs.writeFile(filePath, randomNum.toString(), function(err)
    {
        if(err)
        {
            return console.log(err);
        }
        console.log("succes");
    });

    fs.readFile(filePath ,function(err,data){
        if(err)
        {
            console.log(err);
            return;
        }
        console.log(data.toString());
        res.download(filePath);
    });
    
    
    //res.render('zad2.ejs',{number: randomNum});
});
app.get('/zad3',function(req,res)
{
    res.send('zad3 nie zostalo jeszcze dodane');
});
