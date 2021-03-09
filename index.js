const path = require('path')
const http = require('http')
const express = require('express')
const fs = require('fs')
const session = require('express-session')
const readline = require('readline')
const app = express()
const server = http.createServer(app)
const render  = require('ejs')
const cookieParser = require('cookie-parser')
server.listen(process.env.PORT ?? 443)
const io = require('socket.io')(server)

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())
app.use('/scripts', express.static(path.join(__dirname, 'scripts')))
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.set('trust proxy', true)

app.use(session({
    secret: 'keyboard cat',
    resave: 'false',
    saveUninitialized: true
}))

const options = {
   key: fs.readFileSync(__dirname + '/private.key', 'utf8'),
  cert: fs.readFileSync(__dirname + '/public.crt', 'utf8')
};


const zad1 = require('./routes/zad1.js')
app.use(zad1)
const zad2 = require('./routes/zad2.js')
app.use(zad2)
const zad3 = require('./routes/zad3.js')
app.use(zad3)
const zad4 = require('./routes/zad4.js')
app.use(zad4)
const zad5 = require('./routes/zad5.js')
app.use(zad5)
const zad6 = require('./routes/zad6.js')
app.use(zad6)



io.on('connection', socket => { 
    var freq = 500
    console.log("connected")
    setInterval(function(){
        io.emit('number', Math.random()* 255)
    },freq)
    socket.on('disconnect',()=>{
        console.log('disconnected')
    })
    socket.on("freq", (data)=>{
        console.log(Number(data))
        freq = data
    })
})



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

