import React, { useState } from "react";
import "./style/NavBar.css";
import logo from "./assets/logo.png";
import userImg from "./assets/user.png";

function NavBar({ user, onLogout, onLoginClick }) {
  const [showMenu, setShowMenu] = useState(false);

  const handleProfileClick = () => {
    if (user) setShowMenu((prev) => !prev);
    else onLoginClick();
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar__logo">
        <img src={logo} alt="Logo" />
        <span className="navbar__brand">Stream Flix</span>
      </div>
      {/* Search */}
      <div className="navbar__search">
        <input type="text" placeholder="Search" />
      </div>
      {/* User Profile or Sign In */}
      <div
        className="navbar__profile"
        style={{
          cursor: "pointer",
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
        onClick={handleProfileClick}
      >
        <img
          src={userImg}
          alt="User"
          style={{ width: 36, height: 36, borderRadius: "50%" }}
        />
        {user ? (
          <>
            <span
              style={{
                marginLeft: 10,
                fontWeight: 500,
                color: "#222",
                userSelect: "none",
              }}
            >
              {user.username}
            </span>
            {showMenu && (
              <div
                style={{
                  position: "absolute",
                  top: "110%",
                  right: 0,
                  background: "#fff",
                  border: "1px solid #eee",
                  borderRadius: 8,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  minWidth: 120,
                  zIndex: 1000,
                }}
              >
                <div
                  style={{
                    padding: "12px 18px",
                    cursor: "pointer",
                    color: "#ff1744",
                  }}
                  onClick={() => {
                    setShowMenu(false);
                    onLogout();
                  }}
                >
                  Logout
                </div>
              </div>
            )}
          </>
        ) : (
          <span
            style={{
              marginLeft: 10,
              fontWeight: 500,
              color: "#222",
              userSelect: "none",
            }}
          >
            Sign In
          </span>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
