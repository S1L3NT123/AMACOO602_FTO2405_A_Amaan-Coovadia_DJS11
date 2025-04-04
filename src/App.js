import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PreviewList from "./components/PreviewList";
import ShowDetail from "./components/ShowDetail";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Favourites from "./components/Favourites";
import "./App.css";

function App() {
  const [currentAudio, setCurrentAudio] = useState(null);
  const [theme, setTheme] = useState("light"); // Add theme state

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <Router>
      <div className={`app-container ${theme === "dark" ? "dark-mode" : ""}`}>
        <Navbar toggleTheme={toggleTheme} theme={theme} />
        {currentAudio && (
          <div className="audio-player-container">
            <audio controls autoPlay>
              <source src={currentAudio.src} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
        <main>
          <Routes>
            <Route
              path="/"
              element={<PreviewList setCurrentAudio={setCurrentAudio} />}
            />
            <Route
              path="/show/:id"
              element={<ShowDetail setCurrentAudio={setCurrentAudio} />}
            />
            <Route
              path="/favourites"
              element={<Favourites setCurrentAudio={setCurrentAudio} />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
