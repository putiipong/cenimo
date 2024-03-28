import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { fToHourAndMinute } from 'src/utils/format-time';

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

export default function MovieDetailPage() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [movie, setMovie] = useState(false);
  const params = useParams();
  const id = params?.id;

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const renderImg = (
    <Box
      component="img"
      alt={movie?.poster_url}
      src={movie?.poster_url}
      sx={{
        top: 0,
        width: '40%',
        height: '20%',
        objectFit: 'scale-down',
        mr: 5,
      }}
    />
  );
  const renderVideo = (
    <Box sx={{ maxWidth: '100%', overflow: 'hidden' }}>
      <video controls autoPlay loop width="100%" height="auto" src={movie?.tr_mp4}>
        <track kind="captions" src={movie?.tr_mp4} />
      </video>
    </Box>
  );

  const renderTime = (
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="subtitle1">วันที่ฉาย: {movie?.release_date}</Typography>
      <Typography variant="subtitle1">{fToHourAndMinute(movie?.duration)}</Typography>
    </Stack>
  );
  const renderActor = <Typography variant="subtitle1">นำแสดงโดย: {movie?.actor}</Typography>;

  const renderTitle = (
    <Container>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4" sx={{ mr: 5 }}>
          {movie?.title_th} - {movie?.title_en} | {movie?.rating}
        </Typography>
        <IconButton onClick={toggleFavorite} sx={{ width: 50, height: 50 }}>
          {movie.is_favorite||isFavorite ? (
            <SvgColor src="/assets/icons/heart-flat-icon.svg" sx={{ width: 50 }} />
          ) : (
            <SvgColor src="/assets/icons/heart-outline-icon.svg" sx={{ width: 50 }} />
          )}
        </IconButton>
      </Stack>
      <Typography variant="h6" sx={{ mr: 5 }}>
        {movie?.genre}
      </Typography>
    </Container>
  );

  const getMovieById = async () => {
    try {
      const response = await fetch('https://www.majorcineplex.com/apis/get_movie_avaiable');
      const movies = await response.json();
      const movieById = movies?.movies?.find((m) => m?.id === parseInt(id, 10));
      setMovie(movieById);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMovieById();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Helmet>
        <title> Movie Detail </title>
      </Helmet>

      <Container>
        <Stack direction="row" justifyContent="space-between">
          {renderImg}
          <Stack spacing={2}>
            {renderTitle}
            {renderVideo}
            {renderTime}
            {renderActor}
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
