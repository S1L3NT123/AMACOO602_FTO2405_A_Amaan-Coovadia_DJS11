import React, { useEffect, useState } from "react";
import { getAllShows } from "../api/podcastApi"; // API call to get all shows
import { Link } from "react-router-dom";

// Genre mapping object
const genreMap = {
  1: "Personal Growth",
  2: "Investigative Journalism",
  3: "History",
  4: "Comedy",
  5: "Entertainment",
  6: "Business",
  7: "Fiction",
  8: "News",
  9: "Kids and Family",
};

const PreviewList = () => {
  const [shows, setShows] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("A-Z"); // Default sorting option
  const [selectedGenre, setSelectedGenre] = useState("All"); // Default genre filter

  const sortShows = (shows, option) => {
    switch (option) {
      case "A-Z":
        return shows.sort((a, b) => a.title.localeCompare(b.title));
      case "Z-A":
        return shows.sort((a, b) => b.title.localeCompare(a.title));
      case "Most Recently Updated":
        return shows.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
      case "Least Recently Updated":
        return shows.sort(
          (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
        );
      default:
        return shows;
    }
  };

  const filterByGenre = (shows, genre) => {
    if (genre === "All") return shows;
    return shows.filter((show) => show.genres.includes(parseInt(genre)));
  };

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const data = await getAllShows();
        const filteredShows = filterByGenre(data, selectedGenre);
        setShows(sortShows(filteredShows, sortOption)); // Apply filtering and sorting
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchShows();
  }, [sortOption, selectedGenre]); // Re-fetch when sortOption or selectedGenre changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <h1>Podcast Shows</h1>
      <div className="filters">
        <select onChange={(e) => setSelectedGenre(e.target.value)}>
          <option value="All">All Genres</option>
          {Object.entries(genreMap).map(([id, title]) => (
            <option key={id} value={id}>
              {title}
            </option>
          ))}
        </select>
        <select onChange={(e) => setSortOption(e.target.value)}>
          <option value="A-Z">Sort A-Z</option>
          <option value="Z-A">Sort Z-A</option>
          <option value="Most Recently Updated">Most Recently Updated</option>
          <option value="Least Recently Updated">Least Recently Updated</option>
        </select>
      </div>
      <ul>
        {shows.map((show) => (
          <li key={show.id}>
            {/* Link to the show details page */}
            <Link to={`/show/${show.id}`}>
              <img
                src={show.image}
                alt={show.title}
                style={{ width: "100px", height: "100px", borderRadius: "8px" }}
              />
              <h2>{show.title}</h2>
              {/* Display the genres using the genreMap */}
              <p>
                Genres:{" "}
                {show.genres.map((genreId) => genreMap[genreId]).join(", ")}
              </p>
              <p>Seasons: {show.seasons.length}</p> {/* Number of seasons */}
              <p>
                Last Updated: {new Date(show.updatedAt).toLocaleDateString()}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PreviewList;
