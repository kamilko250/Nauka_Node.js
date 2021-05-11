const express = require('express')
const lodash = require('lodash')
const router = express.Router()
const min = 1
const max = 9999
class Word {
    constructor(word){
        this.word = word
        this.Id = Math.floor(Math.random() * (max - min)) + min;
    }
}

var words  = []
router.get('/zad9', (req, res) => {
    res.send({words: words})
})
router.post('/zad9', (req, res) => {
    let word = req.body["word"]
    words.push(new Word(word))
    res.send({words: words})
})
router.delete('/zad9', (req, res) => {
    let Id = req.body["Id"]
    lodash.remove(words, x => x.Id == Id)
    res.send({words: words})
})
router.put('/zad9', (req, res) => {
    let Id = req.body["Id"]
    let item = lodash.find(words, x => x.Id == Id)
    if(item != undefined)
        item.word = req.body["new_word"]
    res.send({words: words})
})
module.exports = router