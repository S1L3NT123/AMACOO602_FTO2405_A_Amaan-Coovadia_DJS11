// File: src/components/Favourites.js

import React, { useEffect, useState } from "react";

const Favourites = ({ setCurrentAudio }) => {
  const [favourites, setFavourites] = useState([]);
  const [sortOrder, setSortOrder] = useState("title-asc");

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(favs);
  }, []);

  const sortFavourites = (order) => {
    const sortedFavs = [...favourites].sort((a, b) => {
      if (order === "title-asc") return a.title.localeCompare(b.title);
      if (order === "title-desc") return b.title.localeCompare(a.title);
      return 0;
    });
    setFavourites(sortedFavs);
  };

  const removeFavourite = (id) => {
    const updatedFavs = favourites.filter((fav) => fav.id !== id);
    localStorage.setItem("favourites", JSON.stringify(updatedFavs));
    setFavourites(updatedFavs);
  };

  return (
    <div className="container">
      <h1>Your Favourites</h1>

      <select onChange={(e) => sortFavourites(e.target.value)}>
        <option value="title-asc">Title A-Z</option>
        <option value="title-desc">Title Z-A</option>
      </select>

      <ul className="favourites-list">
        {favourites.map((fav) => (
          <li key={fav.id}>
            <h2>{fav.title}</h2>
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
