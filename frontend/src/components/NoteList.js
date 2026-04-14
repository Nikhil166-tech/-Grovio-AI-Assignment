import React from "react";

function NotesList({
    notes,
    selectNote,
    deleteNote,
    createNewNote,
    setSearchTerm,
    toggleDarkMode,
    darkMode
}) {
    return (
        <div className="notes-list">
            <button
                className="dark-mode-btn"
                onClick={toggleDarkMode}
            >
                {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
            </button>
            <button
                className="new-note-btn"
                onClick={createNewNote}
            >
                + New Note
            </button>
            <input
                type="text"
                placeholder="Search notes..."
                className="search-input"
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {notes.length === 0 ? (
                <p>No notes yet</p>
            ) : (
                notes.map((note) => (
                    <div
                        key={note.id}
                        className="note-item"
                    >
                        <h4
                            onClick={() => selectNote(note)}
                        >
                            {note.title || "Untitled Note"}
                        </h4>

                        <button
                            className="delete-btn"
                            onClick={() =>
                                deleteNote(note.id)
                            }
                        >
                            Delete
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default NotesList;