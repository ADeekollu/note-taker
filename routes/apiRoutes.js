

const fs = require("fs");
const uuid = require("uuid");
const path = require("path");
const express = require("express")
const router = express.Router();


router.get("/notes", (req, res) => {
    const notesData = fs.readFileSync("./db/db.json");
    res.json(JSON.parse(notesData))
});


router.post("/notes", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const addNote = req.body;
    addNote.id = uuid.v4();
    notes.push(addNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    res.json(notes);
})

router.delete("/notes/:id", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const deleteNote = notes.filter((delNote) => delNote.id !== req.params.id);
    fs.writeFileSync("./db/db.json", JSON.stringify(deleteNote));

    res.json({ok: true});
})

module.exports = router;