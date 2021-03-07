const express = require('express')
const router = express.Router()
router.use(express.urlencoded({extended: true}))
router.use(express.json())

router.get('/zad5', function(req, res)
{
    res.render('zad5.ejs')
})
router.post('/zad5', function(req, res)
{
    min = Number(req.body['leftmin'])
    max = Number(req.body['leftmax'])
    res.send({ result : (Math.random() * (max-min)) + min })
})

module.exports = router