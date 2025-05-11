import React, { useEffect, useState } from "react";
import "./style/Home.css";

function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        // Fetch all videos from backend
        const res = await fetch("http://localhost:8080/api/videos/all");
        if (res.ok) {
          const data = await res.json();
          setVideos(data);
        } else {
          setVideos([]);
        }
      } catch (err) {
        setVideos([]);
      }
      setLoading(false);
    };
    fetchVideos();
  }, []);

  return (
    <div className="mainarea">
      <div className="mainarea-content">
        <h2 style={{ color: "#111" }}>Home</h2>
        {loading ? (
          <div style={{ color: "#888", fontSize: 20, marginTop: 40 }}>
            Loading...
          </div>
        ) : videos.length === 0 ? (
          <div style={{ color: "#111", fontSize: 20, marginTop: 40 }}>
            No videos found.
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 24,
              marginTop: 32,
            }}
          >
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
                  display: "flex",
                  flexDirection: "column",
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
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: 18,
                    color: "#111",
                    marginBottom: 6,
                  }}
                >
                  {video.title}
                </div>
                <div
                  style={{
                    color: "#666",
                    fontSize: 15,
                    marginBottom: 4,
                  }}
                >
                  Uploaded by: {video.uploader}
                </div>
                <div style={{ color: "#666", fontSize: 15 }}>
                  {video.views} views &nbsp;|&nbsp; {video.likes} likes
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
