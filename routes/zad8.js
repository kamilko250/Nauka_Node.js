const express = require('express')
const router = express.Router()
router.get('/zad8', (req,res)=>{
    res.render('zad8.ejs')
})
router.post("/zad8/logsrequest", (req,res) => {
    let data = req.body["date"]
    let time = req.body["time"]
    console.log(data)
    console.log(time)
    req.setTimeout(60 * 10 * 1000)
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://App:haslo@cluster0.ikdt2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    if(date !== null)
    {
        
    }

    client.connect(err => {
        if(err){
            console.log(err)
            return
        }
        const collection = client.db("RandomLogs").collection("Logs");
        const cursor = collection.find(
            {
                data: data,
                time: time
            })
        const array = cursor.toArray((err, result)=> {
            if(err)
            {
                console.log(err)
                return
            }
            res.send({express: result})
        })
    })
    client.close();
    
})
module.exports = router