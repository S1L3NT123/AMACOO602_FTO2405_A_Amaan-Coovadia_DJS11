import React, { useEffect, useState } from 'react';
import { getShowDetails } from '../api/podcastApi';
import { useParams } from 'react-router-dom';  // Import useParams to get the showId from URL

const ShowDetail = ({ setCurrentAudio }) => {
  const { id } = useParams();// Extract the showId from the URL params
  const [show, setShow] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const data = await getShowDetails(id);// Use the extracted id to fetch show details
        setShow(data);
        setSelectedSeason(data.seasons[0]); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchShow();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
 return (
    <div className="container">
        {/* Display the podcast title */}
        <h1>{show.title}</h1>
        {/* Display the podcast image */}
      <img src={selectedSeason.image || show.image} alt={show.title} />
        {/* Display the podcast description */}
        <p>{show.description}</p>

      {/* seasons and episodes */}
      <h2>Seasons</h2>
      <select onChange={(e) => setSelectedSeason(show.seasons.find(s => s.id === e.target.value))}>
        {show.seasons.map(season => (
          <option key={season.id} value={season.id}>Season {season.number}</option>
        ))}
      </select>
      <ul className="episodes">
        {selectedSeason.episodes.map(episode => (
          <li key={episode.id}>
            <h3>{episode.title}</h3>
            <button onClick={() => setCurrentAudio({ src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', title: episode.title })}>
              Play Episode
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ShowDetail;