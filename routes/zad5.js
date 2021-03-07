const express = require('express')
const router = express.Router()
router.use(express.urlencoded({extended: true}))
router.use(express.json())
router.use("/scripts", express.static("./scritps/"))

router.get('/zad5', function(req, res)
{
    res.render('zad5.ejs')
})
router.post('/zad5', function(req, res)
{
    console.log(req.body)
    min = Number(req.body['leftmin'])
    max = Number(req.body['leftmax'])
    res.send((Math.random() * (max-min)) + min )
})

module.exports = router