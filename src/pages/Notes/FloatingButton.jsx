import React from "react";

function FloatingButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        // backgroundColor: "#FFFBB6",
        background: 'linear-gradient(135deg, rgba(255,251,251,0.63), rgba(255,255,255,0.3))',
        color: "black",
        border: "none",
        borderRadius: "50%",
        width: "56px",
        height: "56px",
        fontSize: "24px",
        cursor: "pointer",
        boxShadow: "0 4px 6px rgba(0,0,0,0.3)"
      }}
    >
      <b>+</b>
    </button>
  );
}
export default FloatingButton;