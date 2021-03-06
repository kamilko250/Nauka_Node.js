const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/zad4', function (req, res)
{
    res.render('zad4.ejs', 
    {
        min: req.session.range ? req.session.range['min'] : 0,
        max: req.session.range ? req.session.range['max'] : 0
    })
})
router.post('/zad4a', function (req, res)
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
router.post('/zad4b', function (req, res) {
    req.session.quantity = req.body.quantity
    //console.log(req.session)
    res.render('zad4b.ejs', 
    {
        site: req.session.place ? req.session.place['site'] : false,
        file: req.session.place ? req.session.place['file'] : false
    })

})
router.post('/zad4final', function (req, res) {
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

router.get("/no_results/wyniki",function(req,res)
{
    res.download('no_results/wyniki.txt');
});
router.get('/downloadz4', function(req,res)
{
    res.download('no_results/resultz4.txt')
})
module.exports = router