import React, { useState } from "react";
import "./style/UploadVideo.css";

function UploadVideo({ user }) {
  const [title, setTitle] = useState("");
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !video || !thumbnail) {
      alert("All fields required");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("uploader", user.username);
    formData.append("video", video);
    formData.append("thumbnail", thumbnail);

    try {
      const res = await fetch("http://localhost:8080/api/videos/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const msg = await res.text();
        alert(msg);
        setTitle("");
        setVideo(null);
        setThumbnail(null);
        setPreview(null);
      } else {
        alert("Failed to upload video. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading video. Check the server logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-video-mainarea">
      <div className="upload-video-card">
        <h2>Upload Video</h2>
        <form className="upload-video-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="video-title">Title</label>
            <input
              id="video-title"
              type="text"
              placeholder="Enter video title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="video-file">Video File</label>
            <input
              id="video-file"
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
            />
          </div>
          <div className="input-group">
            <label htmlFor="video-thumbnail">Thumbnail</label>
            <input
              id="video-thumbnail"
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
            />
          </div>
          {preview && (
            <img
              src={preview}
              alt="Thumbnail Preview"
              className="upload-video-preview"
              style={{ marginTop: 10, marginBottom: 10 }}
            />
          )}
          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadVideo;
