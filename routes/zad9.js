const express = require('express')
const router = express.Router()

var words  = []
router.get('/zad9', (req, res) => {
    res.send({words: words})
})
router.post('/zad9', (req, res) => {
    let word = req.body["word"]
    words.push(word)
    res.send({words: words})
})
router.delete('/zad9', (req, res) => {
    let word = req.body["word"]
    let position = words.indexOf(word)
    words.splice( position, 1)
    res.send({words: words})
})
router.put('/zad9', (req, res) => {
    words[indexOf(req.query["old"])] = req.query["new"]
    res.send({words: words})
})
module.exports = router