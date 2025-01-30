import { useRef, useState, useEffect } from "react";
import "./App.css";

function TextEditor() {
  const editorRef = useRef(null);
  const [activeFormats, setActiveFormats] = useState([]);

  const formats = [
    { cmd: "bold", label: "Bold" },
    { cmd: "italic", label: "Italic" },
    { cmd: "insertUnorderedList", label: "List" },
  ];

  const handleFormat = (command) => {
    document.execCommand(command, false, null);
    editorRef.current.focus();
    updateActiveFormats();
  };

  const updateActiveFormats = () => {
    const active = ["bold", "italic", "insertUnorderedList"].filter((cmd) =>
      document.queryCommandState(cmd)
    );
    setActiveFormats(active);
  };

  const saveContent = () => {
    localStorage.setItem("editorContent", editorRef.current.innerHTML);
  };

  useEffect(() => {
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) {
      editorRef.current.innerHTML = savedContent;
    }

    document.addEventListener("selectionchange", updateActiveFormats);
    return () =>
      document.removeEventListener("selectionchange", updateActiveFormats);
  }, []);

  return (
    <div className="note_body" draggable="false">
      <div className="toolbar">
        {formats.map((format) => (
          <button
            key={format.cmd}
            onClick={() => handleFormat(format.cmd)}
            style={{
              color: activeFormats.includes(format.cmd) ? "#3f6efb" : "black",
            }}
          >
            {format.label}
          </button>
        ))}
      </div>

      <div
        ref={editorRef}
        contentEditable="true"
        className="editor"
        spellCheck="false"
        onInput={saveContent}
      />
    </div>
  );
}

export default TextEditor;
