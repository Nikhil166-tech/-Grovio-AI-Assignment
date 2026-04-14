const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Database = require("better-sqlite3");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Connect database
const db = new Database("notes.db");

// Create table if not exists
db.prepare(`
CREATE TABLE IF NOT EXISTS notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  content TEXT
)
`).run();


// GET all notes
app.get("/notes", (req, res) => {
    try {
        const notes = db.prepare("SELECT * FROM notes").all();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch notes" });
    }
});


// POST create note
app.post("/notes", (req, res) => {
    try {
        const { title, content } = req.body;

        const result = db
            .prepare("INSERT INTO notes (title, content) VALUES (?, ?)")
            .run(title, content);

        res.json({
            id: result.lastInsertRowid,
            title,
            content
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to create note" });
    }
});


// PUT update note
app.put("/notes/:id", (req, res) => {
    try {
        const { title, content } = req.body;

        db.prepare(
            "UPDATE notes SET title = ?, content = ? WHERE id = ?"
        ).run(title, content, req.params.id);

        res.json({ message: "Updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to update note" });
    }
});


// DELETE note
app.delete("/notes/:id", (req, res) => {
    try {
        db.prepare(
            "DELETE FROM notes WHERE id = ?"
        ).run(req.params.id);

        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete note" });
    }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});