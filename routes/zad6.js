const express = require('express')
const router = express.Router()
router.get('/zad6', (req,res)=>{
    res.render('zad6.ejs')
})

module.exports = router
