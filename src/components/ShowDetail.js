// File: src/components/ShowDetail.js

import React, { useEffect, useState } from "react";
import { getShowDetails } from "../api/podcastApi";
import { useParams } from "react-router-dom";

const ShowDetail = ({ setCurrentAudio }) => {
  const { id } = useParams(); // Extract show ID from URL params
  const [show, setShow] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState(null); // Track selected season

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const data = await getShowDetails(id); // Fetch show details by ID
        setShow(data);
        setSelectedSeason(data.seasons[0]); // Set the first season as default
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchShow();
  }, [id]);

  const addToFavourites = (episode, seasonNumber) => {
    const favs = JSON.parse(localStorage.getItem("favourites")) || [];
    const newFavourite = {
      id: episode.id,
      title: episode.title,
      showTitle: show.title, // Store the show's title
      seasonNumber: seasonNumber, // Store the season number
      dateAdded: new Date(), // Store the date it was added
    };

    favs.push(newFavourite);
    localStorage.setItem("favourites", JSON.stringify(favs));
    alert(`${episode.title} added to favourites!`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <h1>{show.title}</h1>

      {/* Show image and description */}
      {show.image && (
        <img
          src={show.image}
          alt={show.title}
          className="show-image" // Ensure this class is applied
        />
      )}
      <p>{show.description}</p>

      {/* Show seasons dropdown */}
      <select
        onChange={(e) => {
          const selectedSeasonId = +e.target.value; // Use unary `+` for conversion
          const season = show.seasons.find(
            (season) => season.id === selectedSeasonId
          );
          setSelectedSeason(season); // Update the selected season
        }}
        value={selectedSeason?.id || ""} // Set the current season as selected
      >
        {show.seasons.map((season) => (
          <option key={season.id} value={season.id}>
            Season {season.number}
          </option>
        ))}
      </select>

      {/* Display episodes for the selected season */}
      {selectedSeason && (
        <div>
          <h2>Episodes {selectedSeason.number}</h2>
          <ul>
            {selectedSeason.episodes.map((episode) => (
              <li key={episode.id}>
                <h3>{episode.title}</h3>

                <button
                  onClick={() =>
                    setCurrentAudio({
                      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // preset song
                      title: episode.title,
                    })
                  }
                >
                  Play Episode
                </button>
                <button
                  onClick={() =>
                    addToFavourites(episode, selectedSeason.number)
                  }
                >
                  Add to Favourites
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ShowDetail;
