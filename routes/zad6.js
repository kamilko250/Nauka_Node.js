const express = require('express')
const router = express.Router()
const socket = require('socket.io')

router.get('/zad6', (req,res)=>{
    res.render('zad6.ejs')
})

var io = socket()
module.exports = router