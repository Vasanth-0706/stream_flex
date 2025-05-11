import React, { useEffect, useState } from "react";
import "./style/MainArea.css";

function MyVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("vsp-user"));

  useEffect(() => {
    const fetchUserVideos = async () => {
      if (!user) {
        setVideos([]);
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(
          `http://localhost:8080/api/videos/user/${encodeURIComponent(
            user.username
          )}`
        );
        if (res.ok) {
          const data = await res.json();
          setVideos(data);
        } else {
          setVideos([]);
        }
      } catch (err) {
        console.error("Error fetching videos:", err);
        setVideos([]);
      }
      setLoading(false);
    };

    fetchUserVideos();
  }, [user]);

  // Handle video deletion
  const handleDelete = async (videoId) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;
    try {
      const res = await fetch(`http://localhost:8080/api/videos/${videoId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setVideos((prev) => prev.filter((v) => v.id !== videoId));
      } else {
        alert("Failed to delete video.");
        console.error("Delete failed:", await res.text());
      }
    } catch (err) {
      alert("Error deleting video.");
      console.error("Error deleting video:", err);
    }
  };

  return (
    <div className="mainarea">
      <div className="mainarea-content">
        <h2 style={{ color: "#111" }}>Your Videos</h2>
        {loading ? (
          <div style={{ color: "#888", fontSize: 20, marginTop: 40 }}>
            Loading...
          </div>
        ) : videos.length === 0 ? (
          <div style={{ color: "#111", fontSize: 20, marginTop: 40 }}>
            You haven't uploaded any videos yet.
          </div>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
            {videos.map((video) => (
              <div
                key={video.id}
                style={{
                  width: 240,
                  background: "#fafafa",
                  borderRadius: 12,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  padding: 16,
                  marginBottom: 24,
                  position: "relative",
                }}
              >
                <img
                  src={
                    video.thumbnail
                      ? `http://localhost:8080/uploads/${video.thumbnail}`
                      : "https://via.placeholder.com/160x90"
                  }
                  alt={video.title}
                  style={{
                    width: "100%",
                    height: 140,
                    borderRadius: 8,
                    marginBottom: 12,
                    objectFit: "cover",
                  }}
                />
                <div style={{ fontWeight: 600, fontSize: 18, color: "#111" }}>
                  {video.title}
                </div>
                <div style={{ color: "#666", fontSize: 15 }}>
                  {video.views} views &nbsp;|&nbsp; {video.likes} likes
                </div>
                <button
                  onClick={() => handleDelete(video.id)}
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    background: "#ff1744",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    padding: "6px 12px",
                    cursor: "pointer",
                    fontSize: 14,
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyVideos;
