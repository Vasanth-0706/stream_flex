import React from "react";

const modalStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.7)",
  zIndex: 2000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const cardStyle = {
  background: "#fff",
  borderRadius: 12,
  padding: 24,
  maxWidth: 720,
  width: "90vw",
  maxHeight: "90vh",
  boxShadow: "0 4px 32px rgba(0,0,0,0.18)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
};

const closeBtnStyle = {
  position: "absolute",
  top: 12,
  right: 18,
  background: "#ff1744",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  padding: "6px 16px",
  fontSize: 16,
  cursor: "pointer",
  zIndex: 10,
};

function VideoPlayerModal({ video, onClose }) {
  return (
    <div style={modalStyle} onClick={onClose}>
      <div style={cardStyle} onClick={(e) => e.stopPropagation()}>
        <button style={closeBtnStyle} onClick={onClose}>
          Close
        </button>
        <video
          src={`http://localhost:8080/uploads/${video.filename}`}
          poster={
            video.thumbnail
              ? `http://localhost:8080/uploads/${video.thumbnail}`
              : undefined
          }
          controls
          autoPlay
          style={{
            width: "100%",
            maxHeight: 400,
            borderRadius: 8,
            background: "#000",
            marginBottom: 16,
          }}
        />
        <div
          style={{
            fontWeight: 600,
            fontSize: 20,
            color: "#111",
            marginBottom: 8,
          }}
        >
          {video.title}
        </div>
        <div style={{ color: "#666", fontSize: 15, marginBottom: 4 }}>
          Uploaded by: {video.uploader}
        </div>
        <div style={{ color: "#666", fontSize: 15 }}>
          {video.views} views &nbsp;|&nbsp; {video.likes} likes
        </div>
      </div>
    </div>
  );
}

export default VideoPlayerModal;
