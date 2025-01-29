import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import TextEditor from "./TextEditor";
function NoteTab() {
  const editorRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [value, setValue] = useState("");

  const dragStartContainer = (e) => {
    setIsDragging(true);
    setOffset({
      x:
        e.clientX - position.x > window.innerWidth - 350
          ? window.innerWidth - 350
          : e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const dragContainer = (e) => {
    if (isDragging) {
      const maxX = window.innerWidth - 300;
      const maxY = document.documentElement.scrollHeight - 200;
      const newX = Math.min(Math.max(0, e.clientX - offset.x), maxX);
      const newY = Math.min(Math.max(0, e.clientY - offset.y), maxY);

      setPosition({ x: newX, y: newY });
    }
  };

  const dragEndContainer = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleResize = () => {
      const maxX = window.innerWidth - 350;
      setPosition((prev) => ({ ...prev, x: maxX }));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [position.x]);

  return (
    <div
      className="note-tab"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,

        position: "absolute",
      }}
    >
      <div
        className="note_tab_header"
        onMouseDown={dragStartContainer}
        onMouseMove={dragContainer}
        onMouseUp={dragEndContainer}
        onMouseLeave={dragEndContainer}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        <div></div>
        <div className="note_header_drag_icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            height={20}
            width={20}
            fill="black"
          >
            <path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm32-192l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z" />
          </svg>
        </div>
        <div>asd</div>
      </div>

      <TextEditor />
    </div>
  );
}

export default NoteTab;
