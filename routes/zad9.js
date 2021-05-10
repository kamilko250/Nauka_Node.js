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
router.post('/zad9/delete', (req, res) => {
    let word = req.body["word"]
    let position = words.indexOf(word)
    words.splice( position, 1)
    res.render('zad9.ejs', {words: words})
})
router.post('/zad9/edit', (req, res)=>{
    let word = req.body.word
    res.render('zad9edit.ejs', {word: word})
})
router.post('/zad9/editconfirm', (req , res) => {
    let new_word = req.body.word_edit
    let old_word = req.body.word_old
    words[words.indexOf(old_word)] = new_word
    res.render('zad9.ejs', {words: words}) 
})
module.exports = router