import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { fToHourAndMinute } from 'src/utils/format-time';

import SvgColor from 'src/components/svg-color';

import {
  removeFromFavorite,
  addToFavorite as addToFavoriteAction,
} from '../../redux/Movies/movie.action';

function ShopProductCard({ movie, addToFavorite, removeFavorite }) {
  const [isFavorite, setIsFavorite] = useState(movie?.is_favotite);
  const router = useRouter();
  const toggleFavorite = () => {
    if (!movie?.is_favotite && !isFavorite) {
      addToFavorite({
        id: movie?.id,
        title_th: movie?.title_th,
        title_en: movie?.title_en,
        rating: movie?.rating,
        genre: movie?.genre,
        release_date: movie?.release_date,
        duration: movie?.duration,
        actor: movie?.actor,
        tr_mp4: movie?.tr_mp4,
        poster_url: movie?.poster_url,
        is_favotite: true,
      });
    }

    if (movie?.is_favotite && isFavorite) {
      removeFavorite(movie?.id);
    }
    setIsFavorite(!isFavorite);
  };

  const renderImg = (
    <Box
      component="img"
      alt={movie?.poster_url}
      src={movie?.poster_url}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderTime = (
    <Typography variant="subtitle1">{fToHourAndMinute(movie?.duration)}</Typography>
  );

  const FavoriteButton = (
    <IconButton onClick={toggleFavorite}>
      {movie?.is_favotite || isFavorite ? (
        <SvgColor src="/assets/icons/heart-flat-icon.svg" sx={{ width: 25, height: 25 }} />
      ) : (
        <SvgColor src="/assets/icons/heart-outline-icon.svg" sx={{ width: 25, height: 25 }} />
      )}
    </IconButton>
  );

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>{renderImg}</Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link
          onClick={() => router.push(`/movie/${movie?.id}`)}
          color="inherit"
          underline="hover"
          variant="subtitle2"
          noWrap
        >
          {movie?.title_th}
          <br />
          {movie?.title_en}
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {renderTime}

          {FavoriteButton}
        </Stack>
      </Stack>
    </Card>
  );
}

ShopProductCard.propTypes = {
  movie: PropTypes.object,
  addToFavorite: PropTypes.func,
  removeFavorite: PropTypes.func,
};

export default connect(null, {
  addToFavorite: addToFavoriteAction,
  removeFavorite: removeFromFavorite,
})(ShopProductCard);
