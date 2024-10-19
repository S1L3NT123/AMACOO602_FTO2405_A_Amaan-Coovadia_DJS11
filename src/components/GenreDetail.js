import React, { useEffect, useState } from 'react';
import { getGenreDetails } from '../api/podcastApi';

const GenreDetail = ({ genreId }) => {
  const [genre, setGenre] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenre = async () => {
      try {
        const data = await getGenreDetails(genreId);
        setGenre(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGenre();
  }, [genreId]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="container">
      <h1>{genre.title}</h1>
      <p>{genre.description}</p>
    </div>
  );
};

export default GenreDetail;

