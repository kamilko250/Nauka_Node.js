const express = require('express')
const router = express.Router()
router.get('/zad8', (req,res)=>{
    res.render('zad8.ejs')
})
router.post("/zad8/logsrequest", (req,res) => {
    let data = req.body["date"]
    let time = req.body["time"]

    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://App:haslo@cluster0.ikdt2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    

    client.connect(err => {
        if(err){
            console.log(err)
            return
        }
        const collection = client.db("RandomLogs").collection("Logs");
        const cursor = collection.find()
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