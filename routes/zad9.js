const express = require('express')
const router = express.Router()

var DB = []
router.get('/zad9', (req, res) => {
    res.render("zad9.ejs", {words: DB})
})
router.post('/zad9', (req, res) => {
    let word = req.body["word"]
    DB.push(word)
    res.send({words: DB})
})
router.delete('/zad9', (req, res) => {
    let word = req.body["word"]
    let pos = DB.indexOf(word)
    if(pos != undefined)
        DB.splice(pos, 1)
    res.send({words: DB})
})
router.put('/zad9', (req, res) => {
    let word = req.body["word"]
    let pos = DB.indexOf(word)
    if(pos != undefined)
        DB[pos] = req.body["new_word"]
    res.send({words: DB})
})
module.exports = router