import { useRef, useState, useEffect } from "react";
import "./App.css";

function TextEditor() {
  const editorRef = useRef(null);
  const [activeFormats, setActiveFormats] = useState([]);

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
        <button
          onClick={() => handleFormat("bold")}
          style={{
            color: activeFormats.includes("bold") ? "#3f6efb" : "black",
          }}
        >
          <b>B</b>
        </button>
        <button
          onClick={() => handleFormat("italic")}
          style={{
            color: activeFormats.includes("italic") ? "#3f6efb" : "black",
          }}
        >
          <i>Italic</i>
        </button>
        <button
          onClick={() => handleFormat("insertUnorderedList")}
          style={{
            color: activeFormats.includes("insertUnorderedList")
              ? "#3f6efb"
              : "black",
          }}
        >
          List
        </button>
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
