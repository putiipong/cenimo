import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Movie Finder',
    path: '/movies',
    icon: icon('ic_blog'),
  },
  {
    title: 'My Favorite',
    path: '/favorite-movies',
    icon: icon('ic_heart'),
  },
];

export default navConfig;
