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

//Get Data for Processing
const mySELECTQuery = `SELECT * FROM ${(process.env.DB_NAME) + "." + process.env.DB_TBLE} WHERE ${process.env.DB_CLM1} = "${process.env.DB_VAL1}";`
let myData;

sql_con.query(mySELECTQuery, function (err, result) {
    if (err) throw err;
    myData = result;

    generateIDs(myData); //Send Data to Processing Function
});
// ===  ===  ===  ===  ===

// ===  Generate IDs Logic  ===

function generateIDs(inputData) {

    const crypto = require('crypto');


    for (let index = 0; index < inputData.length; index++) {

        const USER_ID = inputData[index].ID
        const USER_NAME = inputData[index].Name

        // Create a SHA-256 hash
        const hash = crypto.createHash('sha256')
            .update(`${USER_ID}_${USER_NAME}`)
            .digest('hex');


        console.info("QR_Details:        " + `${inputData[index].ID}_${inputData[index].Name}`);
        console.info('SHA-256 Hash:     ', hash);

        //Adds the Hashes to the Databse
        updateTable(USER_ID, hash)

        //Generates the QR Code Images (imported from /QRCodeGenerator.mjs)
        generateQRImage(USER_NAME, hash);


        console.log(" "); //For spacing
    }

    console.log("# of Entries:      " + inputData.length);

    // ===  ===  ===  ===  ===
}

// ===  Update ID_Hash(s) Logic  ===

function updateTable(userID, hash) {
    let safeGuard = false
    const myUPDATEQuery = `UPDATE ${(process.env.DB_NAME) + "." + process.env.DB_TBLE} SET ${process.env.DB_CLM2} = '${hash}' WHERE ${process.env.DB_CLM3} = '${userID}';`
    console.log(myUPDATEQuery) // For Viewing the Query

    // !!!  TO PREVENT DATABASE DESTRUCTION, THIS SECTION IS DISABLED UNTIL NEEDED  !!!
    //      ALWAYS VERIFY THE QUERY BEFORE RUNNING                                  //!
    //!
    //safeGuard = true;
    //sql_con.query(myUPDATEQuery, function (err, result) {                        //!
    //    if (err) throw err;                                                      //!
    //});                                                                          //!
    //!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    if (!safeGuard) {
        console.warn("WARNING: UPDATE TABLE IS COMMENTED OUT. NOTHING CHANGED")
    }
}

// ===  ===  ===  ===  ===

function generateQRImage(fileName, hash) {

    const QRCode = require('qrcode')

    const dir = "./QR_CODES/"
    const fileType = ".png"

    QRCode.toFile("./QR_CODES/" + fileName + ".png", hash);

}