const fs = require("fs");
const express = require("express");

const app = express();
app.use(express.json());

app.get("/notes", (req, res) => {

    fs.readFile("notes.json", "utf8", (err, data) => {

        if (err) {
            return res.status(500).json({
                message: "Error reading notes "
            }

            );
        }

        const notes = JSON.parse(data);
        res.json(notes);
    });

})

app.listen(3000, () => {
    console.log("Server is running at port 3000");
})