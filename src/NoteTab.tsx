import React, { useState } from "react";

function NoteTab() {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 100, y: 100 });

  const dragStartContainer = (e) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const dragContainer = (e) => {
    if (isDragging) {
      const newX = e.clientX - offset.x;
      const newY = e.clientY - offset.y;
      setPosition({ x: newX, y: newY });
    }
  };

  const dragEndContainer = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="note-tab"
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "100px",
        height: "100px",
        backgroundColor: "lightcoral",
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseDown={dragStartContainer}
      onMouseMove={dragContainer}
      onMouseUp={dragEndContainer}
      onMouseLeave={dragEndContainer}
    >
      Drag Me
    </div>
  );
}

export default NoteTab;
