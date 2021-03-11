const express = require('express')
const router = express.Router()
router.get('/zad8', (req,res)=>{
    res.render('zad8.ejs')
})
router.post("/zad8/logsrequest", (req,res) => {
    //polaczyc sie z baza
    //przefiltrowac dane
    let array = { 
        result: 
        {
            ID: 1,
            Data: "21.23.3244",
            Time: "31:34",
            File: "jakisplik.js",
            Message: "Powodzenie"
        }
    }
    console.log(array)
    res.send(array)
})

module.exports = router