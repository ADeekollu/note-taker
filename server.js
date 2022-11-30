const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001

// middleware

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"))
});

app.post("/api/notes", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("/db/db.json"));
    const newNotes = req.body;
    newNotes.id = Math.floor(Math.random() * 1000);
    notes.push(newNotes);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
    res.json(notes);
});


app.delete("/api/notes/:id", (req, res) => {
   fs.readFile('./db/db.json', 'utf8', (err, data) =>{
    if (err) throw err;
    const notes = JSON.parse(data)
    const newNotes = notes.filter(notes => notes.id !== parseInt(req.params.id));

    fs.writeFile('./db/db.json', JSON.stringify(newNotes), (err, data) => {
        res.json(newNotes);
    });
   }); 
});

app.get('/api/notes/:id', (req, res) => {
    res.json(notes[req.params.id])
})

 app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        res.json(notes);
    })
 })

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);