// File: src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PreviewList from './components/PreviewList';
import ShowDetail from './components/ShowDetail';
import GenreDetail from './components/GenreDetail';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<PreviewList />} />
            <Route path="/show/:id" element={<ShowDetail />} /> {/* Route for show details */}
            <Route path="/genre/:id" element={<GenreDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
