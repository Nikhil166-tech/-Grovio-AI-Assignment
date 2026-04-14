import { useEffect, useState, useRef } from "react";
import axios from "axios";

import NotesList from "./components/NoteList";
import Editor from "./components/Editor";
import Preview from "./components/Preview";

import "./App.css";

/* ===============================
   BACKEND API URL
================================ */

const API_URL =
  "https://grovio-ai-assignment-v08m.onrender.com/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saveStatus, setSaveStatus] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const debounceTimer = useRef(null);

  /* ===============================
     FETCH NOTES
  ================================ */

  const fetchNotes = async () => {
    try {
      const res = await axios.get(API_URL);
      setNotes(res.data);
    } catch (error) {
      console.error("Failed to fetch notes");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  /* ===============================
     DARK MODE
  ================================ */

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  /* ===============================
     SEARCH FILTER
  ================================ */

  const filteredNotes = notes.filter(note =>
    (note.title || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    (note.content || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  /* ===============================
     CREATE NEW NOTE
  ================================ */

  const createNewNote = () => {
    setTitle("");
    setContent("");
    setSelectedId(null);
  };

  /* ===============================
     SAVE NOTE (CREATE OR UPDATE)
  ================================ */

  const saveNote = async () => {
    if (!title && !content) return;

    setSaveStatus("Saving...");

    try {
      if (selectedId) {
        await axios.put(`${API_URL}/${selectedId}`, {
          title,
          content
        });
      } else {
        const res = await axios.post(API_URL, {
          title,
          content
        });

        setSelectedId(res.data.id);
      }

      await fetchNotes();

      setSaveStatus("Saved ✓");

      setTimeout(() => {
        setSaveStatus("");
      }, 1500);

    } catch (error) {
      setSaveStatus("Error saving");
    }
  };

  /* ===============================
     SELECT NOTE
  ================================ */

  const selectNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setSelectedId(note.id);
  };

  /* ===============================
     DELETE NOTE
  ================================ */

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchNotes();
    } catch (error) {
      console.error("Failed to delete note");
    }
  };

  /* ===============================
     AUTO SAVE (DEBOUNCED)
  ================================ */

  useEffect(() => {
    if (!title && !content) return;

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      saveNote();
    }, 1000);

    return () => clearTimeout(debounceTimer.current);

  }, [title, content]);

  /* ===============================
     UI LAYOUT
  ================================ */

  return (
    <div className="layout">

      <NotesList
        notes={filteredNotes}
        selectNote={selectNote}
        deleteNote={deleteNote}
        createNewNote={createNewNote}
        setSearchTerm={setSearchTerm}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        selectedId={selectedId}
      />

      <div className="editor-preview-container">

        <Editor
          title={title}
          content={content}
          setTitle={setTitle}
          setContent={setContent}
          saveNote={saveNote}
          saveStatus={saveStatus}
        />

        <Preview content={content} />

      </div>

    </div>
  );
}

export default App;