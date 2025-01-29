import { useRef, useState, useEffect } from "react";
import "./App.css";

function TextEditor() {
  const editorRef = useRef(null);
  const [activeFormats, setActiveFormats] = useState([]);
  const formats = [
    { cmd: "bold", label: "Bold", style: "bold" },
    { cmd: "italic", label: "Italic", style: "italic" },
    { cmd: "insertUnorderedList", label: "List" },
  ];
  const handleFormat = (command) => {
    document.execCommand(command, false, null);
    editorRef.current.focus();
    updateActiveFormats();
  };

  const updateActiveFormats = () => {
    const formats = ["bold", "italic", "insertUnorderedList"].filter((cmd) =>
      document.queryCommandState(cmd)
    );
    setActiveFormats(formats);
  };

  useEffect(() => {
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
      />
    </div>
  );
}

export default TextEditor;
