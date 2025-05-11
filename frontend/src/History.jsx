import React from "react";
import "./style/MainArea.css";

function History() {
  // Example data
  const history = [
    // { id: 1, title: "Watched Video", thumbnail: "https://via.placeholder.com/160x90", channel: "Channel Name" }
  ];

  return (
    <div className="mainarea">
      <div className="mainarea-content">
        <h2>History</h2>
        {history.length === 0 ? (
          <div style={{ color: "#888", fontSize: 20, marginTop: 40 }}>
            No history yet.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {history.map((video) => (
              <div
                key={video.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "#fafafa",
                  borderRadius: 12,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  padding: 16,
                }}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  style={{
                    width: 160,
                    height: 90,
                    borderRadius: 8,
                    marginRight: 24,
                  }}
                />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 18 }}>
                    {video.title}
                  </div>
                  <div style={{ color: "#666", fontSize: 15 }}>
                    {video.channel}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
