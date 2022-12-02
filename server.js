

const express = require("express");
const path = require("path");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

const app = express();
const PORT = process.env.PORT || 3001

// middleware

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

app.use("/api", apiRoutes);

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



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);