import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PreviewList from './components/PreviewList';
import ShowDetail from './components/ShowDetail';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Favourites from './components/Favourites';
import './App.css';

function App() {
  const [currentAudio, setCurrentAudio] = useState(null);
  
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<PreviewList setCurrentAudio={setCurrentAudio} />} />
            <Route path="/show/:id" element={<ShowDetail setCurrentAudio={setCurrentAudio} />} />
            <Route path="/favourites" element={<Favourites setCurrentAudio={setCurrentAudio} />} />
          </Routes>
        </main>
        {currentAudio && (
          <footer>
              <Footer></Footer>
            <audio controls autoPlay>
              <source src={currentAudio.src} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
                
          </footer>
      )}

      </div>
      
    </Router>
  );
}

export default App;
