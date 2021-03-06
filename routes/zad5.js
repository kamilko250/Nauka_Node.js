const express = require('express')
const router = express.Router()

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