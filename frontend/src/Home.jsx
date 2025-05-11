import React, { useEffect, useState } from "react";
import "./style/Home.css";
import VideoPlayerModal from "./VideoPlayerModal";

function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [historyCount, setHistoryCount] = useState(0);
  const [likedCount, setLikedCount] = useState(0);
  const [subscribedCount, setSubscribedCount] = useState(0);

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

  useEffect(() => {
    // Fetch counts from backend
    const user = JSON.parse(localStorage.getItem("vsp-user"));
    if (user && user.username) {
      fetch(
        `http://localhost:8080/api/user/${encodeURIComponent(
          user.username
        )}/counts`
      )
        .then((res) => res.json())
        .then((data) => {
          setHistoryCount(data.history || 0);
          setLikedCount(data.liked || 0);
          setSubscribedCount(data.subscribed || 0);
        })
        .catch(() => {
          setHistoryCount(0);
          setLikedCount(0);
          setSubscribedCount(0);
        });
    } else {
      setHistoryCount(0);
      setLikedCount(0);
      setSubscribedCount(0);
    }
  }, []);

  // Handle video card click
  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    // Optionally increment view count
    fetch(`http://localhost:8080/api/videos/${video.id}/view`, {
      method: "POST",
    });
  };

  return (
    <div className="mainarea">
      <div className="mainarea-content">
        {/* Add counts summary here */}
        <div
          style={{
            display: "flex",
            gap: 32,
            marginBottom: 24,
            fontSize: 18,
            fontWeight: 500,
            color: "#222",
          }}
        >
          <div>History: {historyCount}</div>
          <div>Liked Videos: {likedCount}</div>
          <div>Subscriptions: {subscribedCount}</div>
        </div>
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
                onClick={() => handleVideoClick(video)}
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
                  cursor: "pointer",
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
        {selectedVideo && (
          <VideoPlayerModal
            video={selectedVideo}
            onClose={() => setSelectedVideo(null)}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
