const express = require('express')
const router = express.Router()

router.get('/zad5', function(req, res)
{
    res.render('zad5.ejs')
})
router.post('/zad5', function(req, res)
{
    //console.log(JSON.stringify(req.body))
    res.render('zad5.ejs')
})

module.exports = router