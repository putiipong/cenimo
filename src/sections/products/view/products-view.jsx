import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import ProductCard from '../product-card';
// ----------------------------------------------------------------------

export default function ProductsView() {
  const [movieList, setMovieList] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch('https://www.majorcineplex.com/apis/get_movie_avaiable');
      const data = await response.json();
      setMovieList(data?.movies);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Movies
      </Typography>

      <Grid container spacing={3}>
        {movieList?.map((movie) => (
          <Grid key={movie.id} xs={12} sm={6} md={3}>
              <ProductCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
