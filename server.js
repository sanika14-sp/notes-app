const fs = require("fs");
const express = require("express");

const app = express();

app.use(express.json());
app.use(express.static("public"));

// GET route to fetch notes from the server 
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

// POST route to add and save the notes 
app.post("/notes", (req, res) => {
    const newNote = req.body;     // The new note send by the browser 
    fs.readFile("notes.json", "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({
                message: "Error reading notes"
            })
        }

        const notes = JSON.parse(data);
        notes.push(newNote);   // Add the new note to the existing one 

        fs.writeFile("notes.json", JSON.stringify(notes), (err) => {
            if (err) {
                return res.status(500).json({
                    message: "Error saving the note"
                })
            }

            res.status(201).json({
                message: "Note saved successfully"
            })
        })
    })
})
app.delete("/notes/:id", (req, res) => {
    fs.readFile("notes.json", "utf8", (err, data) => {

        if (err) {
            return res.status(500).json({
                message: "Error deleting the note"
            })
        }

        const id = parseInt(req.params.id);
        const notes = JSON.parse(data);

        const updatedNotes = notes.filter(note => {
            return note.id !== id;
        });

        fs.writeFile("notes.json", JSON.stringify(updatedNotes), (err) => {

            if (err) {
                return res.status(500).json({
                    message: "Error saving updated notes"
                });
            }

            res.status(200).json({
                message: "Note deleted successfully"
            });
            
        });

    })
});
app.listen(3000, () => {
    console.log("Server is running at port 3000");
})