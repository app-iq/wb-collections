const express = require("express");
const cors = require("cors");

const app = express()

app.use(cors());
app.use(express.json())

const data = [
    {id: 1 , name: 'Ali Faris' , age: 28 , height: 164, phone: '0101010101010' , email: 'ali@test.com'},
    {id: 2 , name: 'Huda Sajed' , age: 27 , height: 157, phone: '0101010101010' , email: 'huda@test.com'},
    {id: 3 , name: 'Fatima Ali' , age: 6 , height: 110, phone: '0101010101010' , email: 'fatima@test.com'},
    {id: 4 , name: 'Mohammed Ali' , age: 2 , height: 80, phone: '0101010101010' , email: 'mohammed@test.com'},
]

app.get('/collection', function (req, res, next) {
    setTimeout(() => {
        if(req.query.error){
            res.status(400);
            res.send();
            return;
        }
        res.json({
            data: data,
            totalCount: data.length
        });
    } , 2000);
});

app.listen(8080, function () {
    console.log('starting wbox-forms test server');
});