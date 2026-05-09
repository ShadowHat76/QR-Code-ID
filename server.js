//This is the node JS backend API for the Angular QR Code Scanner
//Routes defined here will be called by and respond to the Event Driven Code in qrcode.ts

// ===  Express Setup  ===

const express = require('express');
const cors = require('cors');

const app = express();
const port = 3333;
app.use(cors())

// ===  ===  ===  ===  ===

// ===  Database Setup  === 

const mysql = require('mysql2');
const sql_con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
})

sql_con.connect(function (err) {
    if (err) throw err;
    console.log(`DATABASE Connected with USER: ${process.env.DB_USER}`);
});

const myQuery = `SELECT * FROM ${(process.env.DB_NAME) + "." + process.env.DB_TBLE};`
myData = []

sql_con.query(myQuery, function (err, result) {
    if (err) throw err;
    myData = result;
    //console.log(myData);
});

// ===  ===  ===  ===  ===

// ===  API Setup  ===

app.get('/', async (req, res) => { //Get Request can only recieve data from URL Parameters
    const recievedID = req.query.id //.query pulls data from the parameters
    console.log(recievedID);

    let verification = false;

    myData.forEach(element => {
        if (element.ID_HASH == recievedID) {
            verification = true
        }
        else {
        }

    });

    res.send({ status: 200, Data: recievedID, Verified: verification })
});

//This is a wildcard route that returns 404
//It is imperitive it is remains below all other routes to run as a last resort
//Else it will trigger first for everything

//Handle Other Cases
app.get('/*splat', (req, res) => {//splat is part of the express v5 API, older ones like "/*" won't work.
    res.status(404)
        .send('<h2>ERROR 404: PAGE NOT FOUND<h2/>')
});

// ===  ===  ===  ===  ===

// ===  Server Functions  ===


function verifyParticipant(QR_Text) {
    //Verify if the Hash exists in the DB

    try {
        myVERIFYquery = `SELECT * FROM ${(process.env.DB_NAME) + "." + process.env.DB_TBLE} WHERE ${process.env.DB_CLM2} = "${QR_Text}";`
        console.log(myVERIFYquery);

        sql_con.query(myVERIFYquery, function (err, result) {
            if (err) throw err;
            try {
                console.log(result);

                if (result[0].Payment == "PAID") {
                    console.log("RETURNED TRUE")
                    return true;

                }
                console.log(Object.keys(result[0]).length);
            } catch (issue) {
                console.log(issue)
            }

        });

    } catch (error) {
        console.log(error)
    }


}


// ===  ===  ===  ===  ===




// Run Server
app.listen(port, () => {
    console.log(`Service On http://localhost:${port}`); //To use vars and consts inline use ` the backtick not apostrophes
});