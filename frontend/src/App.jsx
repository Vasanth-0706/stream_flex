import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import SideNav from "./SideNav";
import LikedVideos from "./LikedVideos";
import Login from "./Login";
import SignUp from "./SignUp";
import UploadVideo from "./UploadVideo";
import Subscriptions from "./Subscriptions";
import History from "./History";
import Home from "./Home";
import Loading from "./Loading"; // <-- Import the spinner
import MyVideos from "./MyVideos"; // <-- Import MyVideos

function App() {
  // Load user from localStorage on startup
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("vsp-user");
    return saved ? JSON.parse(saved) : null;
  });

  // Load page from localStorage on startup
  const [page, setPage] = useState(() => {
    const saved = localStorage.getItem("vsp-page");
    return saved ? saved : "home";
  });

  const [authPage, setAuthPage] = useState(null); // null | "login" | "signup"
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading (e.g., fetching user/session)
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("vsp-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("vsp-user");
    }
  }, [user]);

  // Save page to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("vsp-page", page);
  }, [page]);

  if (loading) return <Loading />;

  // Pass setUser to Login so it can set the user on successful login
  if (authPage === "login") {
    return (
      <Login
        onClose={() => setAuthPage(null)}
        onShowSignUp={() => setAuthPage("signup")}
        setUser={setUser}
      />
    );
  }

  if (authPage === "signup") {
    return (
      <SignUp
        onClose={() => setAuthPage(null)}
        onShowLogin={() => setAuthPage("login")}
      />
    );
  }

  return (
    <>
      <NavBar
        user={user}
        onLogout={() => setUser(null)}
        onLoginClick={() => setAuthPage("login")}
      />
      <SideNav onNavigate={setPage} />
      {page === "home" && <Home />}
      {page === "subscriptions" && <Subscriptions />}
      {page === "history" && <History />}
      {page === "liked" && <LikedVideos />}
      {page === "myvideos" && <MyVideos />} {/* Show MyVideos page */}
      {page === "upload" && user && <UploadVideo user={user} />}
      {/* Add more pages as needed */}
    </>
  );
}

export default App;
