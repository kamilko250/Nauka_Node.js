const express = require('express')
const router = express.Router()
router.get('/zad8', (req,res)=>{
    res.render('zad8.ejs')
})
router.post("/zad8/logsrequest", (req,res) => {
    //polaczyc sie z baza
    //przefiltrowac dane
    let data = req.body["date"]
    let time = req.body["time"]
    let array = [
        {
            ID: 1,
            Date: "21.23.3244",
            Time: "31:34",
            File: "jakisplik.js",
            Message: "Powodzenie"
        },
        {
            ID: 2,
            Date: "12.23.3344",
            Time: "33:34",
            File: "plik.js",
            Message: "Niepowodzenie"
        }
    ]
    console.log(req.body)
    res.send(array)
})

module.exports = router