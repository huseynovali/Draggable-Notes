import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import TextEditor from "./TextEditor";
function NoteTab() {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [value, setValue] = useState("");

  const dragStartContainer = (e) => {
    setIsDragging(true);
    setOffset({
      x:
        e.clientX - position.x > window.innerWidth - 450
          ? window.innerWidth - 350
          : e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const dragContainer = (e) => {
    if (isDragging) {
      const maxX = window.innerWidth - 400;
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
      <div className="note_tab_header">
        <div></div>
        <div
          onMouseDown={dragStartContainer}
          onMouseMove={dragContainer}
          onMouseUp={dragEndContainer}
          onMouseLeave={dragEndContainer}
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
          className="note_header_drag_icon"
        >
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
        <div className="note_header_asistant">
          <div className="note_question">
            <div className="note_question_module">
              <p>
                <strong>Bold:</strong> <kbd>Ctrl</kbd> + <kbd>B</kbd> (Windows)
                / <kbd>Cmd</kbd> + <kbd>B</kbd> (Mac)
              </p>
              <p>
                <em>Italic:</em> <kbd>Ctrl</kbd> + <kbd>I</kbd> (Windows) /{" "}
                <kbd>Cmd</kbd> + <kbd>I</kbd> (Mac)
              </p>
              <p>
                <strong>List:</strong> <kbd>Ctrl</kbd> + <kbd>Shift</kbd> +{" "}
                <kbd>L</kbd> (Windows) / <kbd>Cmd</kbd> + <kbd>Shift</kbd> +{" "}
                <kbd>L</kbd> (Mac)
              </p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              height={20}
              width={25}
              fill="black"
            >
              <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
            </svg>
          </div>
        </div>
      </div>

      <TextEditor />
    </div>
  );
}

export default NoteTab;
