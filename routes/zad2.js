const express = require('express')
const router = express.Router()
const fs = require('fs')
var fileupload = require("express-fileupload")
router.use(fileupload());
router.use(express.urlencoded({extended: true}))
router.use(express.json())
var path = require('path')


router.get('/zad2', function(req,res)
{
    if(req.cookies)
        res.render('zad2.ejs', {value: req.cookies['value']})
    else
    {
            res.render('zad2.ejs', {value: 1})
    }    
})

router.post('/zad2',function(req,res)
{
    var file
    let value = req.body.ile_liczb
    res.cookie('value', value)

    if(!req.files)
    {
        res.send("File was not found")
        return;
    }
    var filePath = path.join(__dirname + "/no_results/wynik.txt")
    file = req.files.textfile
    str = file.data.toString('utf-8')
    var tab = str.split(',')
    var min1 = Number(tab[0])
    var max1 = Number(tab[1])

    fs.writeFile(filePath, "", function(err)
    {
        if(err)
        {
            return console.log(err + 'blad w write')
        } 
    })
    
    for(step = 0; step < value; step++)
    {
        let randomNum = (Math.random() * max1 % (max1 - min1) ) + min1
        fs.appendFile(filePath, randomNum.toString() + '\n', function(err)
        {
            if(err)
            {
                return console.log(err + 'blad w append')
            } 
        })
    }
    
    res.render('zad2.ejs', {
        link: "/no_results/wyniki",
         value: value
        })
})

module.exports = router