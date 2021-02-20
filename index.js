var path = require('path');
var fileupload = require("express-fileupload");
const fs = require('fs');
const readline = require('readline');
const https = require('http');
const express = require('express');
const app = express();
const url = require('url');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(fileupload());
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('trust proxy', true);

const options = {
   key: fs.readFileSync(__dirname + '/private.key', 'utf8'),
  cert: fs.readFileSync(__dirname + '/public.crt', 'utf8')
};

var server = https.createServer(options, app);

//app.listen(443);
app.listen(process.env.PORT);

const rl = readline.createInterface({
    input: fs.createReadStream('logs.txt'),
    crlfDelay: Infinity
  });

var middleware = function(req, res, next)
{
    fs.appendFile('logs.txt', req.ip + '\n', function(){});
    //console.log(req.ip);
    next();
};
app.use(middleware);

app.get('/', function(req, res) 
{
    res.render('basicView.ejs');
});
app.get('/zad1', function(req, res)
{
    res.render('zad1.ejs',{number: 0 });
});
app.get('/zad2', function(req,res)
{
    res.render('zad2.ejs');
});
app.post('/zad1', function(req, res)
{
    min = Number(req.body.number.min);
    max = Number(req.body.number.max);
    var randomNumber = (Math.random() * max % (max-min) ) + min;
    res.render('zad1.ejs',{number: randomNumber });
});

app.post('/zad2',function(req,res)
{
    var file;
     if(!req.files)
    {
        res.send("File was not found");
         return;
    }
    var filePath = path.join(__dirname + "/no_results/wynik.txt");
    file = req.files.textfile;  // here is the field name of the form
    str = file.data.toString('utf-8');
    var tab = str.split(',');
    var min1 = Number(tab[0]);
    var max1 = Number(tab[1]);

    fs.writeFile(__dirname + "/no_results/wyniki.txt", "", function(err)
    {
        if(err)
        {
            return console.log(err + 'blad w write');
        } 
    });

    for(step = 0; step < req.body.ile_liczb; step++)
    {
        let randomNum = (Math.random() * max1 % (max1-min1) ) + min1;
        fs.appendFile(__dirname + "/no_results/wyniki.txt", randomNum.toString() + '\n', function(err)
        {
            if(err)
            {
                return console.log(err + 'blad w append');
            } 
        });
    }
    res.render('zad2.ejs', {link: "/no_results/wyniki"});
});
app.get("/no_results/wyniki",function(req,res)
{
    res.download('no_results/wyniki.txt');
});
app.post('/zad3',function(req,res)
{
    let array = [];
    var step = 0;
    var steps = req.body.ile_logow;
    rl.on('line', (line) => {
        array.push(line);
        console.log(line);
      });
    console.log(array.length);
    res.render('zad3.ejs',{logs: array});
});
app.get('/zad3',function(req,res)
{
    res.render('zad3.ejs');
})

