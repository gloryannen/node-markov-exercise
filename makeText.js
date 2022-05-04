/** Command-line tool to generate Markov text. */

const markov = require("./markov");
const process = require("process")
const fs = require("fs");
const axios = require("axios");

/** Generate text from Markov Machine. */
function generateText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}

/** Generate text from file. */
function makeText(path) {
    fs.readFile(path, "utf-8", function (err, data) {
        if (err) {
            console.error(`Cannot read file: ${path}: ${err}`);
            process.exit(1);
        }
        generateText(data);
    });
}

/** Generate text from URL */
async function makeURLText(url) {
    try {
        const res = await axios.get(url);
        let text = res.data;
        console.log(text);
    } catch (err) {
        console.error(`Cannot read file: ${path}: ${err}`);
        process.exit(1);
    }
}

if (process.argv[2] === "url" && process.argv[3]) {
    makeURLText(process.argv[3]);
} else if (process.argv[2] === "file" && process.argv[3]) {
    makeText(process.argv[3]);
}

// Example text from given path
makeText("eggs.txt")