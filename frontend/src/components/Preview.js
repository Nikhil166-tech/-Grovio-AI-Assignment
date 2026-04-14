import ReactMarkdown from "react-markdown";

function Preview({ content }) {
    return (
        <div className="preview">
            <h2>Preview</h2>

            <ReactMarkdown>
                {content}
            </ReactMarkdown>
        </div>
    );
}

export default Preview;