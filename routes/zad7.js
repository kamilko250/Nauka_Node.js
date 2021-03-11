const express = require('express')
const router = express.Router()
router.get('/zad7', (req,res)=>{
    res.render('zad7.ejs')
})

module.exports = router