const express = require('express')
const router = express.Router()
const fs = require('fs')

router.post('/zad3',function(req,res)
{
    var array = fs.readFileSync('logs.txt').toString().split("\n")
    var ObjectsList = []
    let ile_logow = req.body.ile_logow
    
    var options  = {
        'time': req.body.time ? true : false, 
        'date': req.body.date ? true : false,
        'method': req.body.method ? true : false,
    }
    console.log(req.cookies['options'])
    res.cookie('options', options)

    if(req.body.ile_logow == "")
    {
           ile_logow = 20
    }
    else
    {
        res.cookie('ile_logow', ile_logow)
    }
    array.forEach(function(line)
    {
        if(line)
        {
            var tab = line.split(' ')
            var Objct = {}
            Objct['ip'] = (tab[0])
            Objct['time'] = (tab[1])
            Objct['date'] = (tab[2])
            Objct['method'] = (tab[3])
            ObjectsList.push(Objct)
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
        res.send('Podano więcej logów niż jest w bazie')
    }     
  
});
router.get('/zad3',function(req,res)
{
    var array = fs.readFileSync('logs.txt').toString().split("\n")
    var ObjectsList = []
    var options
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
            var tab = line.split(' ')
            var Objct = {}
            Objct['ip'] = (tab[0])
            Objct['time'] = (tab[1])
            Objct['date'] = (tab[2])
            Objct['method'] = (tab[3])
            ObjectsList.push(Objct)
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
    })
})
module.exports = router