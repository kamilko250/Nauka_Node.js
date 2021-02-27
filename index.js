var path = require('path');
var fileupload = require("express-fileupload");
var cookieParser = require('cookie-parser');
var session = require('express-session');
const fs = require('fs');
const readline = require('readline');
const https = require('http');
const express = require('express');
const app = express();
const url = require('url');
app.use(session({
    secret: 'keyboard cat',
    resave: 'false',
    saveUninitialized: true
}))
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(fileupload());
app.use(cookieParser());
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('trust proxy', true);

const options = {
   key: fs.readFileSync(__dirname + '/private.key', 'utf8'),
  cert: fs.readFileSync(__dirname + '/public.crt', 'utf8')
};

var server = https.createServer(options, app);

app.listen(443);
app.listen(process.env.PORT);

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
app.get('/zad1', function(req, res)
{
    if(req.cookies)
    {
        res.render('zad1.ejs',{number: 0, min: req.cookies['min'], max: req.cookies['max'] })
    }
    else
    {
        res.render('zad1.ejs',{number: 0, min: 0, max: 0 });
    }
});
app.get('/zad2', function(req,res)
{
    if(req.cookies)
        res.render('zad2.ejs', {value: req.cookies['value']});
    else
    {
            res.render('zad2.ejs',{value: 1});
    }    
});
app.post('/zad1', function(req, res)
{
    if(req.cookies)
    {
        min = req.body.number.min;
        max = req.body.number.max;
        res.cookie('min', min);
        res.cookie('max', max);
        var randomNumber = (Math.random() * max % (max-min) ) + min;
        res.render('zad1.ejs',
        {
            number: randomNumber,
            min: min,
            max: max
        });
    }
});

app.post('/zad2',function(req,res)
{
    var file;
    let value = req.body.ile_liczb;
    res.cookie('value', value);

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

    fs.writeFile(filePath, "", function(err)
    {
        if(err)
        {
            return console.log(err + 'blad w write');
        } 
    });
    
    for(step = 0; step < value; step++)
    {
        let randomNum = (Math.random() * max1 % (max1 - min1) ) + min1;
        fs.appendFile(filePath, randomNum.toString() + '\n', function(err)
        {
            if(err)
            {
                return console.log(err + 'blad w append');
            } 
        });
    }
    
    res.render('zad2.ejs', {link: "/no_results/wyniki", value: value});
});
app.get("/no_results/wyniki",function(req,res)
{
    res.download('no_results/wyniki.txt');
});
app.post('/zad3',function(req,res)
{
    var array = fs.readFileSync('logs.txt').toString().split("\n");
    var ObjectsList = [];
    let ile_logow = req.body.ile_logow;
    
    var options  = {
        'time': req.body.time ? true : false, 
        'date': req.body.date ? true : false,
        'method': req.body.method ? true : false,
    }
    console.log(req.cookies['options']);
    res.cookie('options', options);

    if(req.body.ile_logow == "")
    {
           ile_logow = 20;
    }
    else
    {
        res.cookie('ile_logow', ile_logow);
    }
    array.forEach(function(line)
    {
        if(line)
        {
            var tab = line.split(' ');
            var Objct = {};
            Objct['ip'] = (tab[0]);
            Objct['time'] = (tab[1]);
            Objct['date'] = (tab[2]);
            Objct['method'] = (tab[3]);
            ObjectsList.push(Objct);
        }
    });
    
    if(ile_logow < ObjectsList.length)
    {
        res.render('zad3.ejs',
        {
            logs: ObjectsList.slice(
                (ObjectsList.length - ile_logow))
                .reverse(),
                ile_logow: ile_logow,
                opt: options
        });
    }   
    else
    { 
        res.send('Podano więcej logów niż jest w bazie');
    }     
  
});
app.get('/zad3',function(req,res)
{
    var array = fs.readFileSync('logs.txt').toString().split("\n");
    var ObjectsList = [];
    var options;
    if(req.cookies['options'])
    {
        options = {
            'time': req.cookies['options']['time'] ? true : false, 
            'date': req.cookies['options']['date'] ? true : false,
            'method': req.cookies['options']['method'] ? true : false,
        }
    }
    else
    {
        options = {
            'time': false, 
            'date': false,
            'method': false,
        }
    }

    //res.cookie('options', options);

    array.forEach(function(line)
    {
        if(line)
        {
            var tab = line.split(' ');
            var Objct = {};
            Objct['ip'] = (tab[0]);
            Objct['time'] = (tab[1]);
            Objct['date'] = (tab[2]);
            Objct['method'] = (tab[3]);
            ObjectsList.push(Objct);
        }
    });
    let ile_logow;
    if(req.cookies)
    {
        ile_logow = req.cookies['ile_logow']
    }  
    else
    {
        ile_logow = 1
    } 
    let list;
    res.render('zad3.ejs',
    {
        logs: undefined,
        ile_logow: ile_logow,
        opt: options
    });
});
app.get('/zad4', function (req, res)
{
    res.render('zad4.ejs', 
    {
        min: req.session.range ? req.session.range['min'] : 0,
        max: req.session.range ? req.session.range['max'] : 0
    })
})
app.post('/zad4a', function (req, res)
{
    let min = req.body.min
    let max = req.body.max
    if(min < 0  || max < 0)
    {
        res.send({erorr: 'min or max < 20'})
        return
    }
    if(min >= max)
    {
        res.send({error: 'max must be grater than min'})
        return
    }
    req.session.range = 
    {
        'min': min,
        'max': max
    }

    //console.log(req.session)
    res.render('zad4a.ejs', {quantity: req.session.quantity || 0})
})
app.post('/zad4b', function (req, res) {
    req.session.quantity = req.body.quantity
    //console.log(req.session)
    res.render('zad4b.ejs', 
    {
        site: req.session.place ? req.session.place['site'] : false,
        file: req.session.place ? req.session.place['file'] : false
    })

})
app.post('/zad4final', function (req, res) {
    req.session.place =
    {
        'site': req.body.site ? true : false,
        'file': req.body.file ? true : false
    }
    var results = new Array()
    for(i = 0; i < req.session.quantity; i++)
    {
        let min = Number(req.session.range['min']);
        let max = Number(req.session.range['max']);
        results.push(Math.random() * (max - min) + min);
    }
    var link
    if(req.body.file)
    {
        link = 'no_results/resultz4.txt'
        var logStream = fs.createWriteStream(link, {flags: 'w'});
        results.forEach(element => {
            logStream.write(element + '\n')
        })
        logStream.end()
    }

    res.render('zad4final.ejs', 
    {
        file: req.body.file ? true : false,
        site: req.body.site ? true : false,
        results: req.body.site ? results : new Array()
    })
})
app.get('/downloadz4', function(req,res)
{
    res.download('no_results/resultz4.txt')
})