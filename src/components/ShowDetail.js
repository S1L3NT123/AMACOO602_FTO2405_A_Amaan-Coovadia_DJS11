// File: src/components/ShowDetail.js

import React, { useEffect, useState } from 'react';
import { getShowDetails } from '../api/podcastApi';
import { useParams } from 'react-router-dom';  // Import useParams to get the showId from URL

const ShowDetail = () => {
  const { id } = useParams();  // Extract the showId from the URL params
  const [show, setShow] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const data = await getShowDetails(id);  // Use the extracted id to fetch show details
        setShow(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
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
      {show.image && (
        <img src={show.image} alt={show.title} style={{ width: '300px', borderRadius: '10px' }} />
      )}
      
      {/* Display the podcast description */}
      <p>{show.description}</p>

      {/* Display seasons and episodes */}
      {show.seasons && show.seasons.map((season) => (
        <div key={season.id}>
          <h2>{season.title}</h2>
          <ul>
            {season.episodes.map((episode) => (
              <li key={episode.id}>{episode.title}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ShowDetail;
