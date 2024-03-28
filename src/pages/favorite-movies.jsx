import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet-async';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import ProductCard from '../sections/products/product-card';
// ----------------------------------------------------------------------

function FavoriteMoviesPage({ movies }) {
  return (
    <>
      <Helmet>
        <title> Favorite Movies ♥️ </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Favorite Movies ♥️
        </Typography>

        <Grid container spacing={3}>
          {movies?.map((movie) => (
            <Grid key={movie.id} xs={12} sm={6} md={3}>
              <ProductCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

FavoriteMoviesPage.propTypes = {
  movies: PropTypes.array.isRequired, // Assuming movies is an array
};

const mapStateToProps = (state) => ({
  movies: state.movies.favorites,
});

export default connect(mapStateToProps)(FavoriteMoviesPage);
