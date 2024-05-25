import express from "express";
import bodyParser from "body-parser";
import https from "https";
import fs from "node:fs";
import CSVReadWrite from "./modules/CSVReadWrite.js";

const app = express();
const port = 7000;
/*
const options = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert"),
};
*/
app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    const rcsv = new CSVReadWrite("public/csv/countries.csv");
    const readData = rcsv.readCSV();
    rcsv.printFileDetails();
    //console.log("GET READ DATA RETURNED RESULT:\n", readData);
    //console.log("Keys:\t", Object.keys(readData[0]));
    //console.log("Values:\t", Object.values(readData[0]));

    const writeReply = rcsv.writeCSV(readData, 'Object.csv');
    console.log(writeReply);

    res.json(readData);
});

app.listen(port, (req, res) => {
    console.log(`Server is listening on port: ${port}`);
});

/*
https.createServer(options, app).listen(port, (req, res) => { 
    console.log(`Server is Listening on port: ${port}`);
});
*/
