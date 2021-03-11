const express = require('express')
const router = express.Router()
router.get('/zad8', (req,res)=>{
    res.render('zad8.ejs')
})

module.exports = router