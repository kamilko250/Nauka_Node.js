var path = require('path')
var cookieParser = require('cookie-parser')
var fileupload = require("express-fileupload")
var session = require('express-session')
const fs = require('fs')
const readline = require('readline')
const https = require('http')
const express = require('express')
const app = express()
const url = require('url')
const render  = require('ejs')

app.listen(443);
app.listen(process.env.PORT);

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "scripts")));
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('trust proxy', true);

app.use(session({
    secret: 'keyboard cat',
    resave: 'false',
    saveUninitialized: true
}))

const options = {
   key: fs.readFileSync(__dirname + '/private.key', 'utf8'),
  cert: fs.readFileSync(__dirname + '/public.crt', 'utf8')
};
var server = https.createServer(options, app);

var zad1 = require('./routes/zad1.js')
app.use(zad1)
var zad2 = require('./routes/zad2.js')
app.use(zad2)
var zad3 = require('./routes/zad3.js')
app.use(zad3)
var zad4 = require('./routes/zad4.js')
app.use(zad4)
var zad5 = require('./routes/zad5.js')
app.use(zad5)

const rl = readline.createInterface({
    input: fs.createReadStream('logs.txt'),
    crlfDelay: Infinity
  });

var middleware = function(req, res, next)
{
    var logStream = fs.createWriteStream('logs.txt', {flags: 'a'});
    
    let ts = Date.now();
    let data_obj = new Date(ts);
    let hour = data_obj.getHours();
    let min = data_obj.getMinutes();
    let sec = data_obj.getSeconds();
    let date = data_obj.getDate();
    let month = data_obj.getMonth() + 1;
    let year = data_obj.getFullYear();
    logStream.write(req.ip + " ");
    logStream.write(hour + ":" + min + ":" + sec + " ");
    logStream.write(date + "-" + month + "-" + year + " ");
    logStream.end(req.method + "\n");
    next();
};
app.use(middleware);

app.get('/', function(req, res) 
{
    res.render('basicView.ejs');
});