import { useEffect, useState, useRef } from "react";
import axios from "axios";

import NotesList from "./components/NoteList";
import Editor from "./components/Editor";
import Preview from "./components/Preview";

import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saveStatus, setSaveStatus] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };


  const filteredNotes = notes.filter(note =>
    (note.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (note.content || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchNotes();
  }, []);


  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const fetchNotes = async () => {
    const res = await axios.get("http://localhost:5000/notes");
    setNotes(res.data);
  };
  const createNewNote = () => {
    setTitle("");
    setContent("");
    setSelectedId(null);
  };

  const saveNote = async () => {
    if (!title && !content) return;

    setSaveStatus("Saving...");

    try {
      if (selectedId) {
        await axios.put(
          `http://localhost:5000/notes/${selectedId}`,
          { title, content }
        );
      } else {
        const res = await axios.post(
          "http://localhost:5000/notes",
          { title, content }
        );

        setSelectedId(res.data.id);
      }

      fetchNotes();

      setSaveStatus("Saved ✓");

      setTimeout(() => {
        setSaveStatus("");
      }, 1500);

    } catch (error) {
      setSaveStatus("Error saving");
    }
  };

  const selectNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setSelectedId(note.id);
  };

  const debounceTimer = useRef(null);

  const deleteNote = async (id) => {
    await axios.delete(
      `http://localhost:5000/notes/${id}`
    );

    fetchNotes();
  };

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