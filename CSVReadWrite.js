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

    readCSV() {
        const readresult = fs.readFileSync(this.filepath, "utf-8");
        //console.log("READ RESULT:\n", readresult);

        let ObjectArray = [];
        let columns = [];
        let rows = [];
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

    writeCSV(object_array, file, write_mode) {
        if (file == null) {
            file = `NewFile_${Math.floor(Math.random() * 1 * 1e4)}`;
        } else {
            if (file.slice(0, 12) != "public/csv/") {
                file = `public/csv/${file}`;
            }
            if (file.slice(file.length - 4) != ".csv") {
                file = `${file}.csv`;
            }
        }

        if (write_mode == null) {
            write_mode = "w+";
        }

        this.file = file;
        this.object_array = object_array;
        this.write_mode = write_mode;
        console.log(this.file);

        let columns = Object.keys(this.object_array[0]);
        let rows = [];
        let csvdata = "";
        // CSV Write Code Goes Here...
        if (csvdata.length <= 0) {
            csvdata = `${columns}\n`;
        }
        //console.log("CSV DATA: \n", csvdata);

        for (let i = 0; i < this.object_array.length; i++) {
            rows.push(Object.values(this.object_array[i]));
        }
        //console.log("ROWS:\n", rows);

        for (let i = 0; i < rows.length; i++) {
            if (csvdata.length >= 1) {
                csvdata += `${rows[i]}\n`;
            }
        }
        //console.log("CSV DATA FINAL:\n", csvdata);
        try {
            fs.writeFileSync(`${this.file}`, csvdata, {
                encoding: "utf-8",
                flag: this.write_mode,
                mode: 0o666
            });
            return "File Write Successful!"
        } catch (error) {
            console.log(error);
            return "Error Writing the File!\n" + error.data;
        }
    }
}

export default CSVReadWrite;