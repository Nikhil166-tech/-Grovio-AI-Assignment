import React from "react";

function Editor({
    title,
    content,
    setTitle,
    setContent,
    saveStatus
}) {
    return (
        <div className="editor">

            <input
                placeholder="Note title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                placeholder="Write markdown..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <p className="save-status">{saveStatus}</p>

        </div>
    );
}

export default Editor;