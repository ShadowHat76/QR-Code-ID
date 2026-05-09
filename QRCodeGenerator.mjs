// ===  Database Setup  === 

const mysql = require('mysql2');

const sql_con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS

})
// ===  ===  ===  ===  ===

// ===  Generator Setup  === 

const QRCode = require('qrcode')

function FetchData() {

    let myData;
    const myFETCHQuery = `SELECT * FROM ${(process.env.DB_NAME) + "." + process.env.DB_TBLE} WHERE ${process.env.DB_CLM1} = "${process.env.DB_VAL1}";`


    sql_con.query(myFETCHQuery, function (err, result) {
        if (err) throw err;
        myData = result;

        generateStandalone(myData); //Send Data to Processing Function

    });


}

function generateStandalone(inputData) {

    for (let index = 0; index < inputData.length; index++) {

        const USER_NAME = inputData[index].Name
        const USER_HASH = inputData[index].ID_HASH

        //Generates the QR Code Images (imported from /QRCodeGenerator.mjs)
        generateQRImage(USER_NAME, USER_HASH);
    }
}

export function generateQRImage(fileName, hash) {

    const dir = "./QR_CODES/"
    const fileType = ".png"

    QRCode.toFile("./QR_CODES/" + fileName + ".png", hash);

}