import fs from "node:fs";

class CSVReadWrite {
    constructor(filepath) {
        this.filepath = filepath;
        this.userID = Math.floor(Math.random() * 1 * 1e9) + Math.floor(Math.random() * 1 * 1e9);
    }

    printFileDetails() {
        console.log("File Stats:\n", fs.statSync(this.filepath));
        console.log("User ID:\t", this.userID);
    }

    readFile() {
        const readresult = fs.readFileSync(this.filepath, "utf-8");
        //console.log("READ RESULT:\n", readresult);

        var ObjectArray = [];
        var columns = [];
        var rows = [];
        let prev_pointer = 0

        for (let i = 0; i < readresult.length; i++) {
            if (readresult[i] === "\n") {
                const ROW = readresult.slice(prev_pointer, i).split(",");
                rows.push(ROW);
                prev_pointer = i + 1;
                //console.log("ROW ", i, ROW);
            }
        }
        //console.log("ROWS:\n", rows);

        columns = rows[0];
        //console.log("COLUMNS:\n", columns);

        for (let i = 1; i < rows.length; i++) {
            var OBJECT = {};

            for (let j = 0; j < rows[i].length; j++) {
                OBJECT[columns[j]] = rows[i][j];
            }

            ObjectArray.push(OBJECT);
        }
        //console.log("OBJECT ARRAY:\n", ObjectArray);

        return ObjectArray;
    }
}

export default CSVReadWrite;