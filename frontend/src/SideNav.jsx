import React from "react";
import "./style/SideNav.css";
import uploadIcon from "./assets/upload.png";
import likeIcon from "./assets/like.png";
import subscribeIcon from "./assets/subscribe.png";
import historyIcon from "./assets/history.png";
import homeIcon from "./assets/home.png";
import myVideosIcon from "./assets/myvideos.png"; // Add this line

function SideNav({ onNavigate }) {
  return (
    <aside className="sidenav">
      <nav>
        <ul>
          <li onClick={() => onNavigate("home")}>
            <img
              src={homeIcon}
              alt="Home"
              className="icon"
              style={{ width: 20, height: 20, marginRight: 16 }}
            />
            Home
          </li>
          <li onClick={() => onNavigate("subscriptions")}>
            <img
              src={subscribeIcon}
              alt="Subscriptions"
              className="icon"
              style={{ width: 20, height: 20, marginRight: 16 }}
            />
            Subscriptions
          </li>
          <li onClick={() => onNavigate("history")}>
            <img
              src={historyIcon}
              alt="History"
              className="icon"
              style={{ width: 20, height: 20, marginRight: 16 }}
            />
            History
          </li>
          <li onClick={() => onNavigate("liked")}>
            <img
              src={likeIcon}
              alt="Liked"
              className="icon"
              style={{ width: 20, height: 20, marginRight: 16 }}
            />
            Liked Videos
          </li>
          <li onClick={() => onNavigate("myvideos")}>
            <img
              src={myVideosIcon}
              alt="Your Videos"
              className="icon"
              style={{ width: 20, height: 20, marginRight: 16 }}
            />
            Your Videos
          </li>
          <li onClick={() => onNavigate("upload")}>
            <img
              src={uploadIcon}
              alt="Upload"
              className="icon"
              style={{ width: 20, height: 20, marginRight: 16 }}
            />
            Upload Video
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default SideNav;
