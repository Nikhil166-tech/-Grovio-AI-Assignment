# Markdown Notes Application

A full-stack Markdown Notes Application built using **React.js, Node.js (Express), and SQLite**.
The app allows users to create, edit, delete, and preview notes in real time using Markdown syntax with automatic persistence.

This project was developed as part of an **SDE Fresher Assignment** to demonstrate clean architecture, REST API design, database integration, and frontend usability.

---

## 🚀 Features

### Core Features (Required)

* Create notes with title and content
* Edit existing notes
* Delete notes
* View all saved notes
* Real-time Markdown preview (split screen)
* Persistent storage using SQLite database
* REST API integration between frontend and backend

### Markdown Support

The editor supports:

* Headings (`#`, `##`, `###`)
* Bold (`**bold**`)
* Italic (`*italic*`)
* Ordered lists
* Unordered lists
* Inline code ( `code` )
* Code blocks ( ` ` )
* Hyperlinks `[text](url)`

### Bonus Features Implemented

* Debounced auto-save (prevents API spam)
* Dark mode toggle
* Search notes by title or content
* Responsive layout (mobile + desktop support)
* Active note highlighting
* Save status indicator (Saving / Saved)

---

## 🧱 Tech Stack

| Layer             | Technology        |
| ----------------- | ----------------- |
| Frontend          | React.js          |
| Backend           | Node.js + Express |
| Database          | SQLite            |
| Markdown Renderer | react-markdown    |
| HTTP Client       | Axios             |

---

## 📁 Project Structure

```
Markdown-Notes-App
│
├── backend
│   ├── server.js
│   └── notes.db
│
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── NotesList.js
│   │   │   ├── Editor.js
│   │   │   └── Preview.js
│   │   ├── App.js
│   │   └── App.css
│
└── README.md
```

---

## ⚙️ Backend Setup

Navigate to backend folder:

```
cd backend
```

Install dependencies:

```
npm install
```

Run server:

```
node server.js
```

Server runs at:

```
http://localhost:5000
```

---

## ⚙️ Frontend Setup

Navigate to frontend folder:

```
cd frontend
```

Install dependencies:

```
npm install
```

Start React app:

```
npm start
```

App runs at:

```
http://localhost:3000
```

---

## 🔌 REST API Endpoints

### Get all notes

```
GET /notes
```

### Create note

```
POST /notes
```

Body:

```
{
  "title": "Sample title",
  "content": "Sample content"
}
```

### Update note

```
PUT /notes/:id
```

### Delete note

```
DELETE /notes/:id
```

---

## 🧠 Engineering Decisions

### Why SQLite?

SQLite was chosen because:

* lightweight
* zero configuration
* ideal for local persistence
* suitable for assignment-level projects

---

### Why Debounced Auto-Save?

Auto-save improves UX and prevents excessive API calls by saving only after typing stops for a short duration.

This demonstrates performance-aware frontend design.

---

### Why Component Separation?

The UI is split into:

* NotesList
* Editor
* Preview

This improves:

* readability
* maintainability
* scalability

---

## 📱 Responsive Design

The application supports:

* Desktop split-screen editor
* Tablet stacked layout
* Mobile vertical layout

---

## 🌙 Dark Mode

Users can toggle between light and dark themes using the sidebar switch.
Theme preference updates instantly across the UI.

---

## 🔍 Search Functionality

Users can search notes by:

* title
* content

Filtering updates in real time.

---

## 📸 Demo Video

 

Example:

```
https://your-demo-link.com
```

---

## 🌐 Live Deployment


```Frontend:
https://grovio-ai-assignment-i1w4zhbp7-itharajunikhil61-1004s-projects.vercel.app

Backend:
https://grovio-ai-assignment-v08m.onrender.com
```

---

## ▶️ How to Run Locally (Quick Start)

```
git clone <repository-url>
cd Markdown-Notes-App

cd backend
npm install
node server.js

cd ../frontend
npm install
npm start
```

---

 

---

## 👨‍💻 Author
 
Developed by **Nikhil**
[[!Gmail] (https://shield.io)](mailto:itharajunikhil16@gmail.com)

Full-stack developer focusing on React, Node.js, and scalable application design.
