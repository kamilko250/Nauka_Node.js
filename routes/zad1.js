const express = require('express')
const router = express.Router()
router.use(express.urlencoded({extended: true}))
router.use(express.json())

app.get('/', function(req, res) 
{
    res.render('basicView.ejs');
});

router.get('/zad1', function(req, res)
{
    if(req.cookies)
    {
        res.render('zad1.ejs', {
            number: 0,
            min: req.cookies['min'],
            max: req.cookies['max'] 
        })
    }
    else
    {
        res.render('zad1.ejs', {
            number: 0,
            min: 0,
            max: 0
        })
    }
})

router.post('/zad1', function(req, res)
{
    min = Number(req.body.number.min)
    max = Number(req.body.number.max)
    res.cookie('min', min)
    res.cookie('max', max)
    var randomNumber = (Math.random() * max % (max-min) ) + min
    res.render('zad1.ejs',
    {
        number: randomNumber,
        min: min,
        max: max
    })
})

module.exports = router