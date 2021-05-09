const express = require('express')
const router = express.Router()
var words  = []
router.get('/zad9', (req,res)=>{
    res.render('zad9.ejs', {words: words})
})
router.post('/zad9', (req, res) => {
    let word = req.body["word"]
    words.push(word)
    res.render('zad9.ejs', {words: words})
})
router.get('/zad9/delete', (req, res) => {
    let word = req.query.word
    var position = words.indexOf(word)
    word.slice( position, 1)
    res.render('zad9.ejs', {words: words})
})
router.post('/zad9/edit', (req, res)=>{
    let word = req.query.word
    res.render('zad9edit.ejs', {word: word})
})
router.get('/zad9editconfirm', (req , res) => {
    let word = req.body["word_edit"]
    words[words.indexOf(word)] = 
    res.render('zad9.ejs', {words: words}) 
})