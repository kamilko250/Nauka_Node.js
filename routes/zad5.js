const express = require('express')
const router = express.Router()
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);

router.get('/zad5', function(req, res)
{
    res.render('zad5.ejs',
    {   
        leftmin: 1,
        leftmax: 1,
        rightmin: 1,
        rightmax: 1,
        leftnumber: 1,
        rightnumber: 1  
    })
})
router.post('/zad5', function(req, res)
{
    //console.log(JSON.stringify(req.body))
    res.render('zad5.ejs',
    {
        leftnumber: 1,
        rightnumber: 1  
    })
})




module.exports = router