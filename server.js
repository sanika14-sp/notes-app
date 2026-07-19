const fs = require("fs");

fs.readFile("notes.json", "utf8", (err, data) =>{

    if(err){
        console.log("Error reading notes.json:", err);
        return;
    }

    const notes = JSON.parse(data);
    console.log(notes);
});