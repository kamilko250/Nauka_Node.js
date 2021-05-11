const express = require('express')
const lodash = require('lodash')
const router = express.Router()
const min = 1
const max = 9999

var DB  = []
router.get('/zad9', (req, res) => {
    res.send({words: DB})
})
router.post('/zad9', (req, res) => {
    let word = req.body["word"]
    DB.push(new Word(word))
    res.send({words: DB})
})
router.delete('/zad9', (req, res) => {
    let word = req.body["word"]
    lodash.remove(DB, x => x == word)
    res.send({words: DB})
})
router.put('/zad9', (req, res) => {
    let word = req.body["word"]
    let item = lodash.find(DB, x => x == word)
    if(item != undefined)
        item.word = req.body["new_word"]
    res.send({words: DB})
})
module.exports = router