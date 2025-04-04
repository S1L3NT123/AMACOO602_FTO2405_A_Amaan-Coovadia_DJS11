// File: src/components/Favourites.js

import React, { useEffect, useState } from "react";

const Favourites = ({ setCurrentAudio }) => {
  const [favourites, setFavourites] = useState([]);
  const [sortedFavourites, setSortedFavourites] = useState([]); // Store sorted favourites
  const [sortOrder, setSortOrder] = useState("title-asc"); // Track sort order

  // Helper function to sort favourites
  const sortFavourites = (favourites, sortOrder) => {
    return [...favourites].sort((a, b) => {
      if (sortOrder === "title-asc") return a.title.localeCompare(b.title);
      if (sortOrder === "title-desc") return b.title.localeCompare(a.title);
      if (sortOrder === "date-added-asc")
        return new Date(a.dateAdded) - new Date(b.dateAdded);
      if (sortOrder === "date-added-desc")
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      return 0;
    });
  };

  // Load favourites from localStorage on component mount
  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(favs);
    setSortedFavourites(favs); // Set initial sorted list
  }, []);

  // Sort favourites whenever sortOrder changes
  useEffect(() => {
    setSortedFavourites(sortFavourites(favourites, sortOrder));
  }, [sortOrder, favourites]); // Only re-run when sortOrder or favourites change

  const removeFavourite = (id) => {
    const updatedFavs = favourites.filter((fav) => fav.id !== id);
    localStorage.setItem("favourites", JSON.stringify(updatedFavs));
    setFavourites(updatedFavs);
    setSortedFavourites(updatedFavs); // Also update the sorted list
  };

  return (
    <div className="container">
      <h1>Your Favourites</h1>

      <select onChange={(e) => setSortOrder(e.target.value)}>
        <option value="title-asc">Title A-Z</option>
        <option value="title-desc">Title Z-A</option>
        <option value="date-added-asc">Date Added (Oldest First)</option>
        <option value="date-added-desc">Date Added (Newest First)</option>
      </select>

      <ul className="favourites-list">
        {sortedFavourites.map((fav) => (
          <li key={fav.id}>
            {" "}
            {/* Ensure each list item has a unique key */}
            <h2>{fav.title}</h2>
            <p>Show: {fav.showTitle}</p>
            <p>Season: {fav.seasonNumber}</p>
            <p>Added on: {new Date(fav.dateAdded).toLocaleString()}</p>
            <button
              onClick={() =>
                setCurrentAudio({
                  src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                  title: fav.title,
                })
              }
            >
              Play Episode
            </button>
            <button onClick={() => removeFavourite(fav.id)}>
              Remove from Favourites
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favourites;
