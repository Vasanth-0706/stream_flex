import React from "react";

function Loading() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#fff",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div className="spinner" />
      <div
        style={{
          color: "#ff1744",
          fontWeight: 600,
          fontSize: 22,
          marginTop: 24,
        }}
      >
        Loading Stream Flix...
      </div>
      <style>{`
        .spinner {
          width: 64px;
          height: 64px;
          border: 6px solid #eee;
          border-top: 6px solid #ff1744;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
    </div>
  );
}

export default Loading;
