import React, { useEffect, useState } from 'react';
import { getAllShows } from '../api/podcastApi';  // API call to get all shows
import { Link } from 'react-router-dom';

// Genre mapping object
const genreMap = {
  1: 'Personal Growth',
  2: 'Investigative Journalism',
  3: 'History',
  4: 'Comedy',
  5: 'Entertainment',
  6: 'Business',
  7: 'Fiction',
  8: 'News',
  9: 'Kids and Family'
};


const PreviewList = () => {
  const [shows, setShows] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const data = await getAllShows();
        // Sort the shows alphabetically
        setShows(data.sort((a, b) => a.title.localeCompare(b.title)));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchShows();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <h1>Podcast Shows</h1>
      <ul>
        {shows.map((show) => (
          <li key={show.id}>
            {/* Link to the show details page */}
            <Link to={`/show/${show.id}`}>
              <img src={show.image} alt={show.title} style={{ width: '100px', height: '100px', borderRadius: '8px' }} />
              <h2>{show.title}</h2>
              {/* Display the genres using the genreMap */}
              <p>Genres: {show.genres.map(genreId => genreMap[genreId]).join(', ')}</p>
              <p>Seasons: {show.seasons.length} </p>  {/* Number of seasons */}
              <p>Last Updated: {new Date(show.updatedAt).toLocaleDateString()}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PreviewList;

